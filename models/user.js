const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

})

module.exports = mongoose.model('User', userSchema)