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

exports.route = function (app) {
    var SafeItem = mongoose.model("SafeItem");

    app.get("/safeomaha/types", function (req, res) {
        connect().then(function () {
            SafeItem.types(function (err, types) {
                if (err) {
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
        var type = req.params.type, query = req.query;
        connect().then(function () {
            SafeItem.getItems(type, null, query.meta, function (err, items) {
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
            var query = req.query;
            if (category) {
                SafeItem.getItems(type, category, query.meta, function (err, items) {
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
    return app;
}