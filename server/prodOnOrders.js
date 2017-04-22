
const db = require('APP/db')
const PoO = db.model('prodOnOrders')
const Product = db.model('products')

module.exports = require('express').Router()
  .get('/',//need to make this FORBIDDEN unless you are an admin
    (req, res, next) =>{

      let whereQueryObj={}
      if(req.query.order_id) whereQueryObj.order_id = req.query.order_id
      if(req.query.product_id) whereQueryObj.product_id = req.query.product_id

      PoO.findAll(whereQueryObj)
      .then(poOArr => res.json(poOArr))
      .catch(next)
    })
  .get('/sessionProdOnOrders',
    (req, res, next) =>{
      //req.session.currentOrder = [] //for testing purposes only
      res.json(req.session.currentOrder || [])
    })
  .post('/sessionProdOnOrders',
  //takes in a product id, then updates req.session.currentOrder (an array of product on orders)
  //by either pushing a new poO into the array, or incrementing the qty value of the poO already in the array
    (req, res, next) =>{
      let productID= req.body.productID
      if(!req.session.currentOrder) req.session.currentOrder=[]
      let currentOrder= req.session.currentOrder
      let newpoO= {price: null, qty: 1, product_id: null, order_id: null, associatedProduct: null }
      let incremented= false

      for(let poO of currentOrder){
        if(poO.product_id === productID){
          poO.qty+=1
          incremented= true
          res.json(currentOrder)
        }
      }

      if(!incremented){
        Product.findById(productID)
        .then(singleProduct=>{
          newpoO.associatedProduct=singleProduct
          newpoO.product_id= productID
          currentOrder.push(newpoO)
          res.json(currentOrder)
        })
        .catch(next)
      }
    })
