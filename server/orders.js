'use strict'

const db = require('APP/db')
const Order = db.model('orders')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    let whereQueryObj={}
    if(req.query.user) whereQueryObj.user_id = req.query.user
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
  // .post('/',
  //   (req, res, next) => {
  //     Order.create({})
  //   })
  //how to get order by user?  what should route look like?
