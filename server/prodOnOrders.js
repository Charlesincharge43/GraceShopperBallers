
const db = require('APP/db')
const PoO = db.model('prodOnOrders')
const Product = db.model('products')
//  /api/prodOnOrders

module.exports = require('express').Router()
  .get('/',//need to make this FORBIDDEN unless you are an admin
    (req, res, next) =>{
      let whereQueryObj={}
      if(req.query.order_id) whereQueryObj.order_id = req.query.order_id
      if(req.query.product_id) whereQueryObj.product_id = req.query.product_id


      PoO.findAll({
        where: whereQueryObj,
        include: [{model: Product, as: 'associatedProduct'}],//now product on orders has an associatedProduct key pointing to the relevant product object.  Not sure why it created an associated_product_id field which needs to point to it, when product_id already does...
      })
      .then(poOArr => res.json(poOArr))
      .catch(next)
    })
  .post('/',//are we even going to be using this now that we have the superior setorcreate routes?
    (req, res, next) =>{
      let createQueryObjArr= req.body.poOArr//example:  [ {qty: 5, price: 5}, {qty: 6, price: 6} ]   (json for testing {"poOArr": [ {"qty": "5", "price": "5"}, {"qty": "6", "price": "6"} ] }
      PoO.bulkCreate(createQueryObjArr)
        .then(function() {
          return PoO.findAll();
        })
        .then(function(allPoO) {
          res.json(allPoO)
        })
        .catch(next)
    })
  .put('/add_one',
      (req, res, next) =>{// taking in req.body.product_id and req.body.order_id, increment corresponding poO qty by one (or add a new poO row in db with qty value of 1)
        PoO.classIncrement(req.body.order_id, req.body.product_id)      //use the following to test on postman => {"product_id": "1","order_id": "1"} .. put to http://localhost:1337/api/prodOnOrders/add_one
          .then(poO=>{
            if(!poO) res.sendStatus(401); else res.json(poO)
          })
          .catch(next)
      })
  .put('/setorcreate',
    (req, res, next) =>{// taking in req.body.product_id, req.body.order_id, and req.body.qty, update corresponding poO qty value (or add a new poO row in db with qty value)
      PoO.classSetorCreate(req.body.order_id, req.body.product_id, req.body.qty)
        .then(poO=>{
          if(!poO) res.sendStatus(401); else res.json(poO)
        })
        .catch(next)
    })
  .put('/setorcreateBulk',// taking in req.body.order_id and req.body.prodId_and_qty_Arr (Array of {product_id, qty}) update corresponding poO qty values (or add new poO rows in db with qty value)
    (req, res, next) =>{
      PoO.classSetorCreateBulk(req.body.order_id, req.body.prodId_and_qty_Arr)
        .then(poOArr=>{
          if(poOArr.length===0) res.sendStatus(401); else res.json(poOArr)
        })
        .catch(next)
    })

  // .put('/adminUp',   //This is in the future for debugging purposes (or for administrators)... more open ended update route
  //   (req, res, next) =>{
  //     let whereQueryObj= req.body.whereQueryObj
  //     let upQueryObj= req.body.upQueryObj
  //     PoO.update(upQueryObj, {where: whereQueryObj})
  //       .then(updatedArr => {
  //         if (!updatedArr) res.sendStatus(401)
  //         else res.json(updatedArr)
  //       })
  //       .catch(next)
  //   })
  .get('/sessionProdOnOrders',
    (req, res, next) =>{
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
  .post('/emptySessionProdOnOrders',
    (req, res, next) =>{
      req.session.currentOrder= []
      res.json(req.session.currentOrder)
    })
