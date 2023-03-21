const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()

require("./db")
const app = express()
const user = require('./routes/user')


app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', user)

app.listen(process.env.PORT, (err) => {

    if (err) {

        console.log(err)

    } else {

        console.log("Listening to port 5001")
    }

})

const myFunc = (req, res) => {

    console.log("request from client")
    res.status(200).send({ message: "Hello from server" })

}


//Route || endpoint
app.get('/server-status', myFunc)