var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content:{ type: String, required:true },
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required:true },
    likes: { type:Number, default:0 },
    time : { type : Date, default: Date.now() }
}, { timestamps:true });

module.exports = mongoose.model("Comment",commentSchema);