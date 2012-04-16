var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    comb = require("comb"),
    ObjectId = mongoose.ObjectId,
    config = require("../../config.js")

var SafeItemSchema = new Schema({
    type:String,
    category:String,
    date:Date,
    loc:Array,
    meta:{}
});

SafeItemSchema.statics.types = function (cb) {
    this.distinct("type", null, cb);
};

SafeItemSchema.statics.categories = function (type, cb) {
    this.distinct("category", {type:type}, cb);
};

SafeItemSchema.statics.getItems = function (opts, includeMeta, cb) {
    var q = comb.merge({}, opts);
    opts.loc && (q.loc = { $near:opts.loc, $maxDistance:(opts.radius || config.DEFAULT_RADIUS) / 6378 });
    opts.box && (q.loc = {"$within":{"$box":opts.box}});
    delete q.radius;
    delete q.box;
    var fields = ["type", "category", "date", "loc"];
    includeMeta && fields.push("meta");
    this.find(q, fields).find(cb);
};

SafeItemSchema.statics.topOfficers = function (opts, cb) {
    var q = comb.merge({}, opts);
    opts.loc && (q.loc = { $near:opts.loc, $maxDistance:(opts.radius || config.DEFAULT_RADIUS) / 6378 });
    opts.box && (q.loc = {"$within":{"$box":opts.box}});
    delete q.radius;
    delete q.box;
    this.collection.mapReduce(function () {
        var meta = this.meta;
        if (meta.crimeAdmin) {
            var l = meta.crimeAdmin.length;
            for (var i = 0; i < l; i++) {
                var ca = meta.crimeAdmin[i];
                var b1 = ca.officerBadge1;
                var b2 = ca.officerBadge2;
                if (b1) {
                    emit(b1, {count:1});
                }
                if (b2) {
                    emit(b2, {count:1});
                }
            }
        }
    }, function (key, values) {
        var total = 0;
        for (var i = 0; i < values.length; i++)
            total += values[i].count;
        return { officer:key, count:total };
    }, { out:{inline:1}, query:q}, function (err, results) {
        if (err) {
            cb(err);
        } else {
            var data = results.map(
                function (r) {
                    return r.value;
                });
            data.sort(function (a, b) {
                return b.count - a.count;
            });

            data.length = 10;
            cb(null, data);
        }
    });
};

SafeItemSchema.statics.topCrimes = function (opts, cb) {
    var q = comb.merge({}, opts);
    opts.loc && (q.loc = { $near:opts.loc, $maxDistance:(opts.radius || config.DEFAULT_RADIUS) / 6378 });
    opts.box && (q.loc = {"$within":{"$box":opts.box}});
    delete q.radius;
    delete q.box;
    this.collection.mapReduce(function () {
        var meta = this.meta.crimeOffenseWithXy;
        if (meta) {
            var l = meta.length;
            for (var i = 0; i < l; i++) {
                var ca = meta[i];
                var b1 = ca.offensedes;
                if (b1) {
                    emit(b1, {count:1});
                }
            }
        }
    }, function (key, values) {
        var total = 0;
        for (var i = 0; i < values.length; i++)
            total += values[i].count;
        return { crime:key, count:total };
    }, { out:{inline:1}, query:q}, function (err, results) {
        if (err) {
            cb(err);
        } else {
            var data = results.map(
                function (r) {
                    return r.value;
                });
            data.sort(function (a, b) {
                return b.count - a.count;
            });

            data.length = 10;
            cb(null, data);
        }
    });
}


SafeItemSchema.index({ loc:"2d"})

module.exports = exports = mongoose.model('SafeItem', SafeItemSchema);
