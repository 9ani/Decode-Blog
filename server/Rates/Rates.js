const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RateSchema = new mongoose.Schema({
    text: String,
    blogId:  {type: Schema.Types.ObjectId , ref: 'blog'},
    authorId: {type: Schema.Types.ObjectId , ref: 'user'}
})


module.exports = mongoose.model('rate', RateSchema)