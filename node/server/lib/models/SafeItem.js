var mongoose = require('mongoose')
    , Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
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

SafeItemSchema.statics.getItems = function (type, category, includeMeta, cb) {
    var q = {};
    type && (q.type = type);
    category && (q.category = category);
    var fields = ["type", "category", "date", "loc"];
    includeMeta &&  fields.push("meta");
    this.find(q, fields, cb);
};

SafeItemSchema.index({ loc:"2d"})

module.exports = exports = mongoose.model('SafeItem', SafeItemSchema);