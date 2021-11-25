const jwt = require("jsonwebtoken")
const User = require("../model/User")

const config = process.env

const verifyRole = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]

    const decoded = jwt.verify(token, config.TOKEN_KEY)
    const { email } = decoded

    const user = await User.findOne({ where: { email }})
    if (user.role !== 'doctor') {
        return res.status(403).send("Forbidden")
    }
    
    return next()

}

module.exports = verifyRole