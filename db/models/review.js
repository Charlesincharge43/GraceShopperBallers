'use strict'

const Sequelize = require('sequelize')

module.exports = db => db.define('reviews',

  {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1
      }
    },
    comments: {
      type: Sequelize.TEXT
    }
  },

  {
    hooks: {//Note.. you need one for delete as well (maybe update also?  but taht one is hard)
      afterCreate: function (review) {//after a review has been created, automatically update the associated product's starNum and starDenom
        db.model('products').findById(review.product_id)
          .then(relevantProduct=>{
            return relevantProduct.increment({'starNum': review.rating, 'starDenom': 5})
          })
          .catch(err=>err)
      }
    }
  })

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User, {as: 'user'})
  Review.belongsTo(Product)
}
