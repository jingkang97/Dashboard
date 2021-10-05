const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
    danceMove:{
        type: String
    },
    position:{
        type: String
    },
    userId:{
        type: String
    },
    emg:{
        type: String
    }
    
}, {timestamps: true})

const Data = mongoose.model('Data', dataSchema)
module.exports = Data