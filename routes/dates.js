var express = require('express')
const auth = require("../middleware/auth")
const doctorRole = require("../middleware/doctorRole")
const User = require("../model/User")
const Date = require("../model/Date")
var router = express.Router()

router.get('/:id', doctorRole, async (req, res) => {
    const { id } = req.params

    const dates = await User.findOne({ where: { id: Number(id)}, include: 'Dates' })
    res.send(dates)
})

router.post('/create/:id', auth,  async (req, res) => {
    const { user_id, time, description } = req.body

    try {
        const date = await Date.create({ user_id, doctor_id: req.params.id, time, description })
        res.status(200).send({ success: true, info: date })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', doctorRole, async (req, res) => {
    const { id } = req.params

    let date = await Date.findOne({ where: { id: Number(id) }})

    if(!date) {
        res.send(400).send({ success: false, info: "Date not found" })
    }
    date.status = req.body.status
    await date.save()

    return res.status(200).send({ success: true })
})

module.exports = router