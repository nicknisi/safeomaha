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
    opts.loc && (q.loc = { $near:opts.loc, $spherical : true, $maxDistance:(opts.radius || config.DEFAULT_RADIUS) / 6378 });
    opts.box && (q.loc = {"$within" : {"$box" : opts.box}});
    delete q.radius;
    delete q.box;
    var fields = ["type", "category", "date", "loc"];
    includeMeta && fields.push("meta");
    this.find(q, fields).find(cb);
};


SafeItemSchema.index({ loc:"2d"})

module.exports = exports = mongoose.model('SafeItem', SafeItemSchema);
