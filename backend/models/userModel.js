const db = require('../util/mongodb').db;
const mongoose = require('../util/mongodb').mongoose;   // connection is already established @mongodb.js file.

//Creating the Schema for book
let userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    gender:String,
    city:String,
 });


let UserModel = mongoose.model('userZuqo', userSchema);

module.exports = { UserModel };