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
      classIncrement: function(order_id, product_id){
        return this.findOne({where:{order_id, product_id}})
                .then(poO=>{
                  if(poO) return poO.increment('qty')//if there already exists a product on order belonging to order (of order_id) and pointing to the product_id, then just increment qty by one
                  else return this.create({price: null, qty: 1, product_id, associated_product_id: product_id, order_id})//else create a brand new product on order with foreign keys pointing to product_id and order_id
                })
                .catch(err=>err)
      },
      classSetorCreate: function(order_id, product_id, qty){
        return this.findOne({where:{order_id, product_id}})
                .then(poO=>{
                  if(poO) return poO.update({qty})//if there already exists a product on order belonging to order (of order_id) and pointing to the product_id, then set qty to qty
                  else return this.create({price: null, qty, product_id,associated_product_id: product_id, order_id})//else create a brand new product on order with foreign keys pointing to product_id and order_id, with qty set to qty
                })
                .catch(err=>err)
      },
      classSetorCreateBulk: function(order_id, prodId_and_qty_Arr){//array of prodId and qty objects: [{product_id: 1, qty:1}, {product_id: 2, qty:3}]
        let setorCreatePromiseArr= prodId_and_qty_Arr.map(pId_qty_Obj=>{// same logic as classSetorCreate but in bulk
          let qty= pId_qty_Obj.qty
          let product_id= pId_qty_Obj.product_id
          return this.findOne({where:{order_id, product_id}})
                  .then(poO=>{
                    if(poO) return poO.update({qty})
                    else return this.create({price: null, qty, product_id,associated_product_id: product_id, order_id})
                  })
                  .catch(err=>err)
        })
        return Promise.all(setorCreatePromiseArr)//promise with array of created or updated product on orders as its resolved value
          .then(()=>this.findAll({//unfortunately I just dont know how to do this without queries twice
            where:{order_id},
            include: [{model: db.model('products'), as: 'associatedProduct'}],//***is there a less hacky solution to do this?
          }))
          .catch(err=>err)
      },
    },
    instanceMethods:{
      updatePrice: function(price){
        return this.update({price})
                  .then(updatedPoO=>{
                    console.log('updatedPoO ',updatedPoO)
                    let subtractfromProductInv=updatedPoO.qty
                    return db.model('products').findOne({
                      where: { id: this.product_id }
                    })
                    .then(targetProduct=>{
                      return targetProduct.decrement('inventory', {by: subtractfromProductInv})
                    })
                  })
      }
    },
  })

module.exports.associations = (ProdOnOrder, {Product, Order}) => {//update, i understand now.. revert associated product back to just product, and then refactor everything (will have to change everything tho but thats okay)
  ProdOnOrder.belongsTo(Product, {as: 'associatedProduct'})//needed to make this belongsTo so I can put associatedProduct on here.  For some reason it creates an associated_product_id which points to the relevant product, even though we already have a product_id... need to look into this
  ProdOnOrder.belongsTo(Order)
}
