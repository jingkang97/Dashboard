const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const dataSchema = new Schema({
//     ax:{
//         type: String
//     },
//     ay:{
//         type: String
//     },
//     az:{
//         type: String,
//     },
//     gx:{
//         type: String
//     },
//     gy:{
//         type: String
//     },
//     gz:{
//         type: String
//     }
    
// }, {timestamps: true})

const dataSchema = new Schema({
    danceMove:{
        type: String
    },
    position:{
        type: String
    },
    bettleId:{
        type: String
    },
    emg:{
        type: String
    }
    
}, {timestamps: true})

const Data = mongoose.model('Data', dataSchema)
module.exports = Data