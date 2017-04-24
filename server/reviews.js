const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users')

//http://localhost:1337/api/reviews/

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>{
      let whereQueryObj={}
      if(req.query.user_id) whereQueryObj.user_id = req.query.user_id
      if(req.query.product_id) whereQueryObj.product_id = req.query.product_id
      console.log('whereQueryObj is ', whereQueryObj)
      Review.findAll({
        where: whereQueryObj,
        include: [{model: User, as: 'user'}],
      })
      .then(reviewsArr => res.json(reviewsArr))
      .catch(next)
    })
  .post('/',//{"product_id": "1","user_id": "1", "rating": "2", "comments":"testreview"}  use this for testing purposes on postman
    (req, res, next) =>{
      let rating= req.body.rating
      let comments= req.body.comments
      let user_id= req.body.user_id
      let product_id= req.body.product_id
      Review.create({rating, comments, user_id, product_id})
        .then(()=>Review.findAll({
          where: {product_id},
          include: [{model: User, as: 'user'}],
        }))
        .then(reviewsArr => res.json(reviewsArr))
        .catch(next)
    })
