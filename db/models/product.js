'use strict'

const Sequelize = require('sequelize')

module.exports = db => db.define('products',

  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    inventory: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'http://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-basketball.png&w=288&h=288&transparent=true'
    },
    starNum: {//starNum and starDenom are automatically updated everytime a review is posted.  These values are so you don't have to do a query for all reviews to get a good idea of the overall popular rating of a product
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    starDenom: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }
  },
  {
    instanceMethods: {
      refreshStarVals: function(){//this method is not necessary for the most part, since review hooks update starNum and starDenom.  However, if the product starNum/starDenom should ever become desynced from review ratings, you can run this to sync them up
        let starDenom=0
        let starNum=0
        db.model('reviews').findAll({where: {product_id: this.id}})
          .then(relevantReviews=>{
            for(let review of relevantReviews){
              starDenom+=5
              starNum+=review.rating
            }
            this.starNum= starNum
            this.starDenom= starDenom
            return this
          })
          .catch(err=>err)
      }
    }
  })

module.exports.associations = (Product, {ProdOnOrder, Category, Review}) => {
  Product.hasMany(ProdOnOrder)
  Product.belongsTo(Category)
}
