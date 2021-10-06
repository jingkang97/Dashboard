const Session = require('../models/Session')
const mongoose = require('mongoose')

const getSessions = async(ctx) => {
    try {
        const sessions = await Session.find()
        console.log(sessions)
        ctx.res.json(sessions) 
        ctx.res.status(200).json({message: 'success', sessions: sessions})
    } catch (error) {
        ctx.res.json({message: error.message})
        // ctx.res.status(404).json({message: error.message})
    }
}

const postSession = (req, res, next) => {
    let session = new Session ({
        sessionName: req.body.sessionName,
        users: req.body.users,
        owner: req.body.owner,
        numberOfUsers: req.body.numberOfUsers,
        syncDelay: req.body.syncDelay,
        emg: req.body.emg,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        groupDanceScore: req.body.groupDanceScore,
        groupPositionScore: req.body.groupPositionScore,
        individualDanceScore: req.body.individualDanceScore,
        individualMoveScore: req.body.individualMoveScore
    })
    session.save()
    .then(sess => {
        res.json({
            message: 'Session Added Successfully!',
            session: sess
        })
    })
    .catch(error => {
        // alert(error)
        res.json({
            message: 'An error occured!',
            error: error
        })
        return
    })
}

const getSession = (req, res) => {
    console.log('params: ',req.params.username)
    User.findOne({username: req.params.username})
    .then(user => {
        if(user){
            // console.log(user)
            res.status(200).json({
                message:'user found!', 
                name: user.name,
                id: user._id,
                username: user.username,
                password: user.password,
                wearable_id: user.wearable_id,
                wearable_name: user.wearable_name,
                image: user.image
            })
        }else{
            res.json({
                message: 'No user found!',
            })
        }
    })
}


module.exports = {
    getSession, getSessions, postSession
}
