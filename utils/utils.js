const db = require('APP/db')
const Product = db.model('products')

function setSessionPoOBulk({prodId_and_qty_Arr, currentOrder}){
  let promiseArr= prodId_and_qty_Arr.map(pId_qty_obj=>{
    req_qty=pId_qty_obj.qty
    req_product_id=pId_qty_obj.product_id
    let newpoO= {price: null, qty: req_qty, product_id: null, order_id: null, associatedProduct: null }
    let changed= false
    for(let poO of currentOrder){
      if(poO.product_id === req_product_id){
        poO.qty= req_qty
        changed= true
        return Promise.resolve(true)//no need to return currentOrder after each loop... just return true so promise all knows this particular iteration is done
      }
    }

    if(!changed){
      return Product.findById(req_product_id)
      .then(singleProduct=>{
        newpoO.associatedProduct=singleProduct
        newpoO.product_id= req_product_id
        currentOrder.push(newpoO)
        return true//no need to return currentOrder after each loop... just return true so promise all knows this particular iteration is done
      })
      .catch(err=>err)
    }
  })

  return Promise.all(promiseArr)
  .then(()=>currentOrder)
  .catch(err=>err)
}

function setSessionPoO({req_product_id, req_qty, currentOrder}){
  let newpoO= {price: null, qty: req_qty, product_id: null, order_id: null, associatedProduct: null }
  let changed= false
  for(let poO of currentOrder){
    if(poO.product_id === req_product_id){
      poO.qty= req_qty
      changed= true
      return Promise.resolve(currentOrder)//just to keep this function always returning promises (because the below would be returning a promise too)
    }
  }

  if(!changed){
    return Product.findById(req_product_id)
    .then(singleProduct=>{
      newpoO.associatedProduct=singleProduct
      newpoO.product_id= req_product_id
      currentOrder.push(newpoO)
      return currentOrder
    })
    .catch(err=>err)
  }
}

function incrementSessionPoO({req_product_id, currentOrder}){
  let newpoO= {price: null, qty: 1, product_id: null, order_id: null, associatedProduct: null }
  let incremented= false
  for(let poO of currentOrder){
    if(poO.product_id === req_product_id){
      poO.qty+=1
      incremented= true
      return Promise.resolve(currentOrder)//just to keep things as promises (because the below would be returning a promise too)
    }
  }

  if(!incremented){
    return Product.findById(req_product_id)
    .then(singleProduct=>{
      newpoO.associatedProduct=singleProduct
      newpoO.product_id= req_product_id
      currentOrder.push(newpoO)
      return currentOrder
    })
    .catch(err=>err)
  }
}



module.exports = {
  incrementSessionPoO,
  setSessionPoO,
  setSessionPoOBulk,
}
