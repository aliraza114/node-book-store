const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorController = require('./controllers/error')
// const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    // User.findById('5f782736f1b4de222ad825e6')
    // .then(user => {
    //     req.user = new User(user.name, user.email, user.cart, user._id)
    //     next()
    // })
    // .catch(err => {
    //     console.log('User error ', err)
    // })
});

app.use('/admin', adminRoutes)
app.use(shopRoutes);

app.use(errorController.get404)

mongoose.connect('mongodb+srv://aliraza:aliraza@cluster0.g6cnw.mongodb.net/onlineshop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000)
    }).catch(err => {
        console.log(err)
    })
