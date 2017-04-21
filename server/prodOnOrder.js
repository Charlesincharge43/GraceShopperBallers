'use strict'

const db = require('APP/db')
const ProdOnOrder = db.model('prodOnOrders')

module.exports = require('express').Router()
  .get('/:orderId', (req, res, next) =>
    ProdOnOrder.findAll({
      where: { order_id: req.params.orderId }
    })
    .then(prods => res.json(prods))
    .catch(next))
