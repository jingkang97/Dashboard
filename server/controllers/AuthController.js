const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    User.findOne({username: req.body.username}).then(user => {
        if(user){
            console.log(user)
            return res.json({message: "User already exists."})
        }else{
            bcrypt.hash(req.body.password , 10, function(err, hashedPass) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                let user = new User ({
                    name: req.body.name,
                    username: req.body.username,
                    password: hashedPass,
                    wearable_id: '',
                    wearable_name: 'Not Selected'
                })
                user.save()
                .then(user => {
                    let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'User Added Successfully!',
                        token: token,
                        username: user.username,
                        name: user.name,
                        authorised: true
                    })
                    return
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!',
                        authorised: false
                    })
                    return
                })
            })
        }   
    })
}

const login = async(req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{username:username}, {name:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                    return
                }
                if(result){
                    let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '5h'})
                    res.json({
                        message: 'Login Successful!',
                        token: token,
                        username: user.username,
                        image: user.image,
                        authorised: true
                    })
                    return
                }
                else{
                    const result = res.json({
                        message: 'Wrong password!',
                        authorised: false
                    })
                    return
                }
            })
        }else{
            res.json({
                message: 'No user found!',
                authorised: false
            })
            return
        }
    })
}

module.exports = {
    register, login
}

