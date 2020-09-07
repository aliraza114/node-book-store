const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use('/add',(req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add </button> </form>')
});

app.use('/product', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000); // create server and listen for route
