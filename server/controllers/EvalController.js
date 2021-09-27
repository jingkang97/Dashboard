const Evaluation = require('../models/Evaluation')
const User = require('../models/User')
const mongoose = require('mongoose')

const getEval = async(res, next) => {
    try {
        // const eval = await Evaluation.findById('6151d24c0c9f741e79f015b5')
        // console.log(eval)
        // res.json(users) 
        // return eval[0]
        Evaluation.findById('6151d24c0c9f741e79f015b5').then(data => {
            // return(data)
            next.status(200).json({message: 'success', data: data})
        })
        
        // Evaluation.findOne({sessionId:123}).then(data => {
        //     if(data){
        //         console.log(data)
        //         // res.status(200).json({
        //         //     message:'data found!', 
        //         //     data: data
        //         // })
        //     }else{
        //         console.log('no user found')
        //         // res.json({
        //         //     message: 'No user found!',
        //         // })
        //     }
        // })
    } catch (error) {
        // ctx.res.json({message: error.message})
        // ctx.res.status(404).json({message: error.message})
    }
    
}


module.exports = {
    getEval
}
