'use strict'

const db = require('APP/db')
const Category = db.model('categories')

console.log('@Categories Route')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) => {
      return Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)})
  .post('/',
    (req, res, next) =>{
      return Category.create(req.body)
      .then(singleCategory => res.status(201).json(singleCategory))
      .catch(next)
    })
  .get('/:id',
    (req, res, next) =>
      Category.findById(req.params.id)
      .then(singleCategory => res.json(singleCategory))
      .catch(next))
  .delete('/:id',//NEED TO MAKE THIS FORBIDDEN TO ALL BUT ADMIN (NOT JUST HIDE THE REMOVE BUTTON FROM THE VIEW ON THE FRONTEND)
    (req, res, next) =>
      Category.destroy({where: {id: req.params.id}})
      .then(() => res.json('success'))
      .catch(next))
