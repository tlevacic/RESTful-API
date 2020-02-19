//created scheme for student, object which will be stored in DB
const mongoose = require('mongoose');

const studentScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //used for id
    name: {type: String , required: true},
    lastName: {type: String , required: true},
    gender: {type: String, default: null},
    age: {type: Number, required: true},
    address: {type: String, default: "---"},
});

module.exports = mongoose.model('Student', studentScheme);
