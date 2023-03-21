const User = require("../models/user")

const signin = (req, res) => {

}


const register = async(req, res) => {

    try {

        let { email, password, firstname, lastname } = req.body
        const user = await User.findOne({ email })
        if (user) return res.stats(404).send({ success: false, message: "User already exists" })

        const newUser = new User({ email, password, firstname, lastname })

        const createdUser = await newUser.save()

        return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })

    } catch (err) {

        res.status(404).send({ success: false, message: err })

    }

}


module.exports = { signin, register }