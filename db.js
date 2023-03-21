const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL).then(() => {

    console.log("Connceted to database")

}).catch((err) => {

    console.log(err)
})