const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogSchema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId , ref: 'category'},
    time: String,
    image: String , 
    description: String,
    time: String,
    author:{type: Schema.Types.ObjectId, ref:'user'},
    viewsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 }

})
module.exports = mongoose.model('blog', BlogSchema)