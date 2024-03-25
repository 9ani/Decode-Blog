const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    about: String,
    isAdmin: Boolean,
})

module.exports = mongoose.model('user', UserSchema)