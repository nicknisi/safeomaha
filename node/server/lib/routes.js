var models = require("./models"),
    comb = require("comb"),
    config = require("../config.js"),
    mongoose = require("mongoose");


var connected = false;
var connect = function (cb) {
    var ret = new comb.Promise();
    if (!connected) {
        mongoose.connect(config.MONGO_URL, function (err) {
            if (err) {
                ret.errback(err);
            } else {
                connected = true;
                ret.callback();
            }
        });
    } else {
        ret.callback();
    }
    return ret;
};

var getSpatialQuery = function(opts, query){
    if (query.x && query.y) {
        opts.loc = [parseFloat(query.x), parseFloat(query.y)];
        if (query.radius) {
            opts.radius = parseFloat(query.radius);
        }
    } else if (query.minx && query.miny && query.maxx && query.maxy) {
        opts.box = [
            [parseFloat(query.minx), parseFloat(query.miny)],
            [parseFloat(query.maxx), parseFloat(query.maxy)]
        ];
    }
}

exports.route = function (app) {
    var SafeItem = mongoose.model("SafeItem");

    app.get("/safeomaha/types", function (req, res) {
        connect().then(function () {
            SafeItem.types(function (err, types) {
                if (err) {
                    res.header("max-age", 100000000);
                    res.json({error:err.stack});
                } else {
                    res.json({types:types})
                }
            });
        }, function (err) {
            res.json({error:err.stack});
        });
    });

    app.get("/safeomaha/:type", function (req, res) {
        var type = req.params.type, query = req.query, loc;
        connect().then(function () {
            var opts = {type:type};
            getSpatialQuery(opts, query);
            SafeItem.getItems(opts, query.meta, function (err, items) {
                if (err) {
                    res.json({error:err.stack});
                } else {
                    res.json({items:items})
                }
            });
        }, function (err) {
            res.json({error:err.stack});
        });
    });

    app.get("/safeomaha/:type/categories", function (req, res) {
        var type = req.params.type;
        connect().then(function () {
            SafeItem.categories(type, function (err, items) {
                if (err) {
                    res.json({error:err.stack});
                } else {
                    res.json({type:type, categories:items});
                }
            });
        }, function (err) {
            res.json({error:err.stack});
        });
    });

    app.get("/safeomaha/:type/:category?", function (req, res) {
        connect().then(function () {
            var type = req.params.type;
            var category = req.params.category;
            if (category) {
                var opts = {type:type, category:category};
                var query = req.query;
                getSpatialQuery(opts, query);
                SafeItem.getItems(opts, query.meta, function (err, items) {
                    if (err) {
                        res.json({error:err.stack});
                    } else {
                        res.json({items:items})
                    }
                });
            } else {
                next();
            }
        }, function (err) {
            res.json({error:err.stack});
        });
    });

    app.get("/safeomaha", function (req, res) {
        connect().then(function () {
            var opts = {};
            var query = req.query;
            getSpatialQuery(opts, query);
            SafeItem.getItems(opts, query.meta, function (err, items) {
                if (err) {
                    res.json({error:err.stack});
                } else {
                    res.json({items:items})
                }
            });
        }, function (err) {
            res.json({error:err.stack});
        });
    });
    return app;
}