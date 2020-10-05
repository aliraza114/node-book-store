// const mongodb = require('mongodb')
// const getDb = require('../util/database').getDb
// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title
//     this.price = price
//     this.description = description
//     this.imageUrl = imageUrl
//     this._id = id ? new mongodb.ObjectId(id) : null
//     this.userId = userId
//   }

//   save() {
//     const db = getDb()
//     let dbOperation
//     if(this._id){
//       dbOperation = db.collection('products').updateOne(
//         { _id: this._id}, {$set: this}   
//       )
//     }
//     else {
//       dbOperation = db.collection('products').insertOne(this)
//     }
//     return db.collection('products')
//       .insertOne(this)
//       .then(result => {
//         console.log('Result ', result)
//       })
//       .catch(err => {
//         console.log('Error ', err)
//       })
//   }

//   static fetchAll() {
//     const db = getDb()
//     return db.collection('products').find().toArray()
//       .then(products => {
//         console.log('Products ', products)
//         return products
//       })
//       .catch(err => {
//         console.log('Error ', err)
//       })
//   }

//   static findById(prodId) {
//     const db = getDb()
//     return db.collection('products')
//     .find({ _id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product => {
//       console.log('Product ', product)
//       return product
//     })
//     .catch(err => {
//       console.log('Error ', err)
//     })

//   } 

//   static deleteById(prodId) {
//     const db = getDb()
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(product => {
//       console.log('Product Deleted ', product)
//       return product
//     })
//     .catch(err => {
//       console.log('Delete Error ', err)
//     })
//   }

// }

// module.exports = Product