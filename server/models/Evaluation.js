const mongoose = require('mongoose')
const Schema = mongoose.Schema

const evaluationSchema = new Schema({
    sessionId:{
        type: String
    },
    datas:{ type: Array
    }
    // datas:[{
    //     danceMove : {type : String},
    //     position1 : {type : String},
    //     position2 : {type : String},
    //     position3 : {type : String},
    // }]

})

const Evaluation = mongoose.model('Evaluation', evaluationSchema)
module.exports = Evaluation