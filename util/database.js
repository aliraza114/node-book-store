const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let db = null

const mongoConnect = callback => {  
    MongoClient.connect('mongodb+srv://aliraza:aliraza@cluster0.g6cnw.mongodb.net/onlineshop?retryWrites=true&w=majority', {useUnifiedTopology: true}).then(client =>{
        db = client.db()
        callback()
    }).catch(err => {
        console.log('Error! ', err)
        throw err
    })
}

const getDb = () => {
    if(db){
        return db
    }
    throw 'No db found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb