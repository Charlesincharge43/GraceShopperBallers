'use strict'

const Sequelize = require('sequelize')

module.exports = db => db.define('prodOnOrders',

  {
    price: {
      type: Sequelize.DECIMAL,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },

  {
    classMethods:{
      classIncrement: function(product_id, order_id){
        return this.findOne({where:{product_id, order_id}})
                .then(poO=>{
                  if(poO) return poO.increment('qty')//if there already exists a product on order belonging to order (of order_id) and pointing to the product_id, then just increment qty by one
                  else return this.create({price: null, qty: 1, product_id, order_id})//else create a brand new product on order with foreign keys pointing to product_id and order_id
                })
                .catch(err=>err)
      },
      classSetorCreate: function(product_id, order_id, qty){
        return this.findOne({where:{product_id, order_id}})
                .then(poO=>{
                  if(poO) return poO.update({qty})//if there already exists a product on order belonging to order (of order_id) and pointing to the product_id, then set qty to qty
                  else return this.create({price: null, qty, product_id, order_id})//else create a brand new product on order with foreign keys pointing to product_id and order_id, with qty set to qty
                })
                .catch(err=>err)
      },
    },
  })

module.exports.associations = (ProdOnOrder, {Order}) => {
  ProdOnOrder.belongsTo(Order)
}
