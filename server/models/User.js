const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String,
        // select: false
    },
    wearable_id:{
        type: String
    },
    wearable_name:{
        type: String
    },
    image:{
        type: String
    },
    sessions: {
        type: Array
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User