const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err))
  // Product.findById(prodId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().
    then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    }).catch(err => {
      console.log(err)
    })
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    }).catch(error => console.log(error))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId).then(product => {
    return req.user.addToCart(product)
  }).then(result => {
    console.log(result)
  })

  // let fetchedCart
  // req.user.getCart()
  // .then(cart => {
  //   fetchedCart = cart
  //   return fetchedCart.getProducts({where: {id: prodId}})
  // })
  // .then(products => {
  //   let product
  //   if(products.length > 0){
  //     product = products[0]
  //   }
  //   let newQuantity = 1
  //   if(product){
  //     const oldQuantity = product.cartItem.quantity
  //     newQuantity = oldQuantity
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity }
  //     })
  //   }
  //   return Product.findById(prodId)
  //   .then(product => {
  //     return fetchedCart.addProduct(product, {
  //       through: {quantity: newQuantity}
  //     })
  //   }).then(() => {
  //     res.redirect('/cart')
  //   })
  //   .catch(err => console.log(err))
  // })
  // .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(res => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
  let fetchedCart
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(
            product => {
              product.orderItem = { quantity: product.cartItem.quantity }
              return product
            }
          ))
        })
        .catch(err => console.log(err))
    })
    .then(result => {
      return fetchedCart.setProducts(null)
    })
    .then(res => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  res.user.getOrders()
    .then(orders => {

    })
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
