const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogSchema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId , ref: 'category'},
    time: String,
    image: String , 
    description: String,
    time: String,
    author:{type: Schema.Types.ObjectId, ref:'user'}
})
module.exports = mongoose.model('blog', BlogSchema)