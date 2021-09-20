const Data = require('../models/Data')
const mongoose = require('mongoose')

const simulatePost = async (req, res) => {
    console.log(req.body)
    let data = new Data ({
        ax: req.body.ax,
        ay: req.body.ay,
        az: req.body.az,
        gx: req.body.gx,
        gy: req.body.gy,
        gz: req.body.gz
    })
    data.save()
    .then(data => {
        res.json({
            ax: data.ax,
            ay: data.ay,
            az: data.az,
            gx: data.gx,
            gy: data.gy,
            gz: data.gz
        })
        return
    })
    .catch(error => {
        res.json({
            message: 'An error occured!',
        })
        return
    })
}

const simulateDelete = async (req, res) => {
    Data.deleteMany({}).then(res => {
        console.log(res)
    })
}

module.exports = {
    simulatePost, simulateDelete
}

