const User = require("../models/user")
const bcyrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signin = async(req, res) => {

    try {

        let { email, password } = req.body
        if (!email || !password) return res.status(404).send({ success: false, message: "all fields are required" })

        let user = await User.findOne({ email })

        if (!user) return res.status(404).send({ success: false, message: "Account doesn't exists" })

        let isCorrectPassword = await bcyrypt.compare(password, user.password)

        delete user._doc.password

        if (isCorrectPassword) {

            let token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "1h" })

            return res.status(200).send({ success: true, user, token })

        } else {

            return res.status(404).send({ success: false, message: "Please verify your credentials" })
        }

    } catch (err) {


        res.status(404).send({ success: false, message: err })

    }
}


const register = async(req, res) => {

    try {

        let { email, password, firstname, lastname } = req.body
        const user = await User.findOne({ email })
        if (user) return res.status(404).send({ success: false, message: "User already exists" })


        const newUser = new User({ email, password, firstname, lastname })

        const createdUser = await newUser.save()

        return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })

    } catch (err) {
        console.log(err)
        res.status(404).send({ success: false, message: err })

    }

}



const getUsers = async(req, res) => {

    try {

        const users = await User.find()
        res.status(200).send({ success: true, users })

    } catch (err) {

        res.status(404).send({ success: false, err })

    }



}

module.exports = { signin, register, getUsers }