'use strict'

const db = require('APP/db')
const Order = db.model('orders')
//  /api/orders

module.exports = require('express').Router()
  .get('/', (req, res, next) => {//get order by user or status (or both, or none)
    let whereQueryObj={}
    if(req.query.user_id) whereQueryObj.user_id = req.query.user_id
    if(req.query.status) whereQueryObj.status = req.query.status
    Order.findAll({
      where: whereQueryObj
    })
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
  })
  .get('/:orderID',
    (req, res, next) => {
      Order.findById(req.params.orderID)
      .then(order=>{
        res.json(orders);
      })
      .catch(next)
    })
  .post('/',
    (req, res, next) => {
      let orderObj= req.body
      Order.create(orderObj)
        .then(order => {
          if (!order) {
            res.sendStatus(401)
          } else {
            res.json(order)
          }
        })
        .catch(next)
    })
  .put('/complete',
    (req, res, next) => {// taking in req.body.user_id, update the incomplete order with status: complete, make a new incomplete order, and then res.json it
      Order.completeOrder(req.body.user_id)
        .then(newIncompleteOrder => {
          if (!newIncompleteOrder) {
            res.sendStatus(401)
          } else {
            res.json(newIncompleteOrder)
          }
        })
        .catch(next)
    })
