var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name:{ type:String, required:true },
    email: String,
    country: String,
    BookId: { type:Schema.Types.ObjectId, ref:'Book'}
})

module.exports = mongoose.Schema( "Author", authorSchema );