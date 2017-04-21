'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/billing', require('./billing'))
  .use('/categories', require('./categories'))
  .use('/products', require('./products'))
  .use('/orders', require('./orders'))
  .use('/prodOnOrder', require('./prodOnOrder'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
