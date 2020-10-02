const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = callback => {   
    MongoClient.connect('mongodb+srv://aliraza:aliraza@cluster0.g6cnw.mongodb.net/onlineshop?retryWrites=true&w=majority').then(client =>{
        console.log('Connected! ', client)
        callback(client)
    }).catch(err => {
        console.log('Error! ', err)
    })
}

module.exports = mongoConnect