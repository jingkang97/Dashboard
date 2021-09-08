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
                    name: 'test',
                    username: req.body.username,
                    password: hashedPass,
                    wearable_id: 'test',
                    wearable_name: 'test'
                })
                user.save()
                .then(user => {
                    let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'User Added Successfully!',
                        token: token,
                        username: user.username,
                        authorised: true
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!',
                        authorised: false
                    })
                })
            })
        }   
    })
}

const login = (req, res, next) => {
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
                }
                if(result){
                    let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token: token,
                        username: user.username,
                        authorised: true
                    })
                }else{
                    res.json({
                        message: 'Wrong password!',
                        authorised: false
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found!',
                authorised: false
            })
        }
    })
}

module.exports = {
    register, login
}

