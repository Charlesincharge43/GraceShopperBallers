'use strict'

const db = require('APP/db')
const Order = db.model('orders')

module.exports = require('express').Router()
  .get('/',//need to make this FORBIDDEN unless you are an admin
    (req, res, next) =>
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
  .get('/?user=auth_id&status=compenum', (req, res, next) => {
    Order.findAll({
      where: { user_id: req.query.user, status: req.query.status }
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
