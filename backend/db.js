const express = require('express')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:270177/paytm");


//
// const UserSchema  = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     }
// })
//
//
// const User = mongoose.model('User', UserSchema);
//
// module.exports = {
//     User
// };
//


const userSchema  = mongoose.Schema({
    userName : String,
    password : String,
    firstName : String,
    lastName : String
});

const User  = mongoose.model('User',userSchema);
module.exports = {
    User
}

