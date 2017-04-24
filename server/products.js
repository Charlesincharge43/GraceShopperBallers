'use strict'

const db = require('APP/db')
const Product = db.model('products')

console.log('@ Products route')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Product.findAll()
        .then(products => res.json(products))
        .catch(next))
  .post('/',//make new product row
    (req, res, next) =>
      Product.create(req.body)
      .then(singleProduct => res.status(201).json(singleProduct))
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Product.findById(req.params.id)
      .then(singleProduct => res.json(singleProduct))
      .catch(next))
  .delete('/:id',//NEED TO MAKE THIS FORBIDDEN TO ALL BUT ADMIN (NOT JUST HIDE THE REMOVE BUTTON FROM THE VIEW ON THE FRONTEND)
    (req, res, next) =>
      Product.destroy({where: {id: req.params.id}})
      .then(() => res.json('success'))
      .catch(next))
