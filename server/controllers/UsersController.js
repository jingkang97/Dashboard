const User = require('../models/User')

const getUser = (req, res) => {
    var username = req.params.username
    User.findOne(username)
    .then(user => {
        if(user){
            // console.log(user)
            res.status(200).json({
                message:'user found!', 
                username: user.username,
                password: user.password,
                wearable_id: user.wearable_id,
                wearable_name: user.wearable_name
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


module.exports = {
    getUser, getUsers
}

