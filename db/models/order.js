'use strict'

const Sequelize = require('sequelize')
console.log('here----*********************')

module.exports = db => db.define('orders',
  {
    status: {
      type: Sequelize.ENUM('complete', 'incomplete'),
      allowNull: false
    }
  },

  {
    classMethods: {
      newIncompleteOrder: function(user_id){
        return this.findOrCreate({where: {user_id, status: 'incomplete'}})
                .spread((incompleteOrder,created)=>{
                  if(!created) console.error('Caution: an attempt to create a new incomplete order was made despite one already existing')
                  return incompleteOrder
                })
                .catch(err=>err)
      },
      completeOrder: function(user_id){//This method not only completes the incomplete order associated with user_id, but ALSO makes a new incomplete one afterward
        return this.update({status: 'complete'}, {where: {user_id, status: 'incomplete'}})
          .then(updateArr=>{
            if(updateArr[0]!==1) console.error('Something weird happened.. completeOrder should only update exactly 1 order, but that didnt happen.  Look into it!')
            return this.newIncompleteOrder(user_id)
          })
          .catch(err=>err)
      },
    }
  })

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
