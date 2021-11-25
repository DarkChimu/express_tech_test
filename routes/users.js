var express = require('express')
const auth = require("../middleware/auth")
const User = require("../model/User")
const Date = require("../model/Date")

const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var router = express.Router()

router.get('/doctors', auth, async (req, res) => {
  const users = await User.where({ role: 'doctor' })
  res.send(users)
})

router.get('/doctor/:id', auth, async(req, res, params) => {
  const { id } = params
  const user = await User.findOne({ role: 'doctor', id })
  res.send(user)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  
  if (!user) {
    res.status(401).send({ error: 'Invalid email or password' })
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    )

    user.token = token
    await user.save()

    res.status(200).send(token)
  }

  res.status(400).send("Invalid Credentials")
})
router.post('/register', async (req, res) => {

  const { firstName, lastName, email, password, role, phone } = req.body

  const encryptedPassword = await bcrypt.hash(password, 10)

  const existingUser = await User.findOne({ where: { email }})

  if (existingUser) {
    return res.status(400).send({ success: false, message: 'User already exists' })
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      phone,
      role
    })

    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token
    await user.save()
    return res.status(200).send(token)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
