'use strict'

const db = require('APP/db')
const Order = db.model('orders')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
