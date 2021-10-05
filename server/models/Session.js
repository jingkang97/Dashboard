const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    sessionName:{
        type: String
    },
    owner:{
        type: String
    },
    users:{
        type: Array
    },
    numberOfUsers:{
        type: Number
    },
    emg:{
        type: Array
    },
    syncDelay:{
        type: Array
    },
    startTime:{
        type: String
    },
    endTime:{
        type: String
    }
    
}, {timestamps: true})

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session