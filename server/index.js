const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

//підключення й ініціалізація бази даних
mongoose.connect("mongodb://127.0.0.1:27017/projectdb")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//що будемо туди відправляти
const authSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const authModel = mongoose.model('users', authSchema)

app.post('/adduser', async (req, res) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);


    const auth = new authModel({
        surname: req.body.surname,
        name: req.body.name,
        password: hashedPassword, 
        email: req.body.email,
        address: req.body.address,
    })

    await auth.save()
    res.send('200 Success')
})

//задання порту для серверу
app.listen(3001, () => {
    console.log("server started on port 3001")
})
