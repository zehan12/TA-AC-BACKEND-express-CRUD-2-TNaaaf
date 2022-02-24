var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String, required:true },
    summary: String,
    pages: Number,
    publication: String,
    cover_image: Buffer,
    cateygory:[{type:String}],
    authors: [{type:Schema.Types.ObjectId, ref:"Author", required:true }]
}, {timestamps:true});

module.exports = mongoose.model( "Book", bookSchema );