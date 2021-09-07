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
        type: String
    },
    wearable_id:{
        type: String
    },
    wearable_name:{
        type: String
    }
    
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User