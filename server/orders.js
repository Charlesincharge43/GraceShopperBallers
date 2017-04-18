'use strict'

const db = require('APP/db')
const Order = db.model('orders')

module.exports = require('express').Router()
  .get('/',//need to make this FORBIDDEN unless you are an admin
    (req, res, next) =>
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
  .get('/currentOrder',
    (req, res, next) => {
      if(req.user){
        Order.findAll({
          where: {
            user_id: req.user.id,//we'll figure this out after OATH/figuring out passport
            status: 'incomplete',
          }
        })
        .then(orders=>{
          res.json(orders[0]);
        })
        .catch(next)
      }
      else {
        res.json(res.session.currentOrder);//currentOrder is an array of Product On Orders
      }
    })
  .post('/currentOrder',
    (req, res, next) => {
      let newPoO = req.body.PoO;

      if(req.user){
        Order.findAll({
          where: {
            user_id: req.user.id,//we'll figure this out after OATH/figuring out passport
            status: 'incomplete',
          }
        })
        .then(orders=>orders[0].id)
        // .then(currOrderId=>)   //finish later
        .catch(next)
      }
      else {
        req.session.currentOrder.push(req.body.PoO);
        res.json(res.session.currentOrder);
      }
    })
