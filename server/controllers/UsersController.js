const User = require('../models/User')
const mongoose = require('mongoose')
const { deleteOne } = require('../models/User')

const getUser = (req, res) => {
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
                image: user.image,
                data: user
            })
        }else{
            res.json({
                message: 'No user found!',
            })
        }
    })
}

const getUsers = async(ctx) => {
    try {
        const users = await User.find()
        console.log(users)
        ctx.res.json(users) 
        ctx.res.status(200).json({message: 'success', users: users})
    } catch (error) {
        // ctx.res.json({message: error.message})
        // ctx.res.status(404).json({message: error.message})
    }
    
}

const editUser = async (req, res) => {
    // const {id: _id} = req.params;
    const user = req.body;
    const _id = req.body.id
    console.log(user)
    console.log(_id)
    
    // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id')
    // async - need await
    try {
        const editedUser = await User.findByIdAndUpdate(_id, {...user, _id}, {new:true});
        res.json(editedUser)
    } catch (error) {
        alert(error)
    }
    ;
}

const addSession = async (req, res) => {
    // const {id: _id} = req.params;
    const session = req.body.session
    const username = req.body.username
    // const userId = req.params.id
    // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id')
    // async - need await
    try {

        await User.updateMany(
            {username:{$in: username}},
            { $push : {sessions: session}},
            ).then(data => {
                res.status(200).json({message:'success', data: data})
            })
        

        // await User.findOneAndUpdate(
        //     {username: username},
        //     { $push : {sessions: session}},
        //     ).then(data => {
        //         res.status(200).json({message:'success', data: data})
        //     })
        // res.json(editedUser)
    } catch (error) {
        console.log(error)
    }
    ;
}




module.exports = {
    getUser, getUsers, editUser, addSession
}

