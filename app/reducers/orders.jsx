import axios from 'axios'

import { changeSessionOrdersBulkTC, getSessionOrdersTC } from './session.jsx'

export const RECEIVE_ORDER = 'RECEIVE_ORDER'
export const ALL_ORDERS = 'ALL_ORDERS'
export const AUTH_USER_ORDERS = 'AUTH_USER_ORDERS'
export const ALL_PRODS_ON_ORDER = 'ALL_PRODS_ON_ORDER'

export const AUTH_ORDER_PRODS = 'AUTH_ORDER_PRODS'
export const SET_CURRENT_PRODS_ON_ORDER = 'SET_CURRENT_PRODS_ON_ORDER'


//-------------------------------- orders ACTION CREATOR ------
export const receiveOrderAC = order => ({//should be changed to receive incomplete order
  type: RECEIVE_ORDER,
  order
})

export const allOrders = allOrders => ({
    type: ALL_ORDERS,
    allOrders
})

// export const allPoO= allPoO => ({
//   type: ALL_PRODS_ON_ORDER,
//   allPoO
// })

export const setCurrentPoOAC = currentPoO => ({
    type: SET_CURRENT_PRODS_ON_ORDER,
    currentPoO
})

export const authUserOrders = orders => ({
    type: AUTH_USER_ORDERS,
    orders
})

export const authOrderProds = prodsOnOrders => ({
    type: AUTH_ORDER_PRODS,
    prodsOnOrders
})


//-------------------------------- INITIAL STATE ------

//SUPER CONFUSING!  allOrders consist of order objects, NOT the products associated with the order objects
//currentPoO consist of PRODUCTS associated either unassociated wtih any order objects (if user is guest), or associated with
//the incomplete order in the logged in user's database
//don't get it twisted!!!

//WE NEED TO ESTABLISH A NAMING CONVENTION!!!!!  OR AT LEAST REFACTOR SOMETIME IN THE NEXT FEW DAYS TO MAKE THESE STATE KEYS LESS CONFUSING
let initialState = {
  allOrders: [],//array of order objects   //pretty much will never be used unless an admin needs to see all of them
  // allPoO: [],

//------completed orders for logged in user, and product on orders (prodsOnOrders) associated with them -----
  authCompOrders: [],
  prodsOnOrders: [],


//------incomplete order for logged in user, and product on orders (currentPoO) associated with it, OR product on orders in the session (for guests) -----
  authInCompOrder: {},//This will be fetched whenever a user is logged in... to make the current incomplete order id always available (to facilitate making post/put requests in productOnOrders, which require order_id)
  currentPoO: [],//array of product on orders associated with the current order object

};


//-------------------------------- REDUCER ------

export const ordersReducer = (prevState = initialState, action) => {

  const newState = Object.assign({}, prevState)

  switch (action.type) {

    case ALL_ORDERS:

      newState.allOrders = [...action.allOrders];
      return newState;

    case SET_CURRENT_PRODS_ON_ORDER:

      newState.currentPoO = [...action.currentPoO];
      return newState;

    case AUTH_USER_ORDERS:
      newState.authCompOrders = [...action.orders];
      return newState;

    case AUTH_ORDER_PRODS:

      newState.prodsOnOrders = [...action.prodsOnOrders];
      return newState;

    case RECEIVE_ORDER:

      newState.authInCompOrder = action.order;
      return newState;

    // case ALL_PRODS_ON_ORDER:
    //
    //   newState.allPoO = action.allPoO;
    //   return newState;

    default:
      return prevState;
  }
}


//--------------------------------------------- THUNKS
// THIS IS SUPER CONFUSING... THUNKS HERE AND IN SESSION.JSX NEED TO BE CONSOLIDATED INTO ONE FILE

export function setCurrentPoOfromDbTC(order_id){//this simply pulls product on orders from database (associated with the incomplete order of logged in user)
  return function thunk(dispatch){
    return axios.get(`/api/prodOnOrders/?order_id=${order_id}`)
      .then(res=>{
        let poOArr=res.data
        dispatch(setCurrentPoOAC(poOArr))
      })
  }
}

export function changePoOinDbTC(order_id, prodId_and_qty_Arr){//think of this as "merging" or "syncing" session to database
  return function thunk(dispatch){
    return axios.put('/api/prodOnOrders/setorcreateBulk', {order_id, prodId_and_qty_Arr})
      .then(res=>{
        let newPoOArr=res.data
        dispatch(setCurrentPoOAC(newPoOArr))
      })
  }
}

export function removePoOfromDbTC(order_id, product_id){//remove poO in db that matches order_id and product_id
  return function thunk(dispatch){
    return axios.delete(`/api/prodOnOrders/delete_one/?order_id=${order_id}&product_id=${product_id}`)
      .then(res=>{
        return dispatch(setCurrentPoOfromDbTC(order_id))
      })
  }
}

export function removePoOfromSessionsTC(product_id){
  return function thunk(dispatch){
    return axios.delete(`/api/prodOnOrders/delete_one_from_session/?product_id=${product_id}`)
      .then(res=>{
        let newSessionPoO= res.data
        return dispatch(setCurrentPoOAC(newSessionPoO))
      })
  }
}

export function emptySessionPoOTC(){
  return function thunk(dispatch){
    return axios.post('/api/prodOnOrders/emptySessionProdOnOrders')
      .then(res=>{
        let emptiedPoOArr=res.data
        dispatch(setCurrentPoOAC(emptiedPoOArr))
      })
  }
}

export function receiveIncompleteOrderTC(user_id){
  return function thunk(dispatch){
    return axios.get(`/api/orders/?user_id=${user_id}&status=incomplete`)
      .then(r=>r.data)
      .then(dbIncompleteOrders=>dispatch(receiveOrderAC(dbIncompleteOrders[0])))
      .catch(err=>err)
  }
}

export function setSessionandSyncDbTC(order_id, prodId_and_qty_Arr){// this does a combination of set sessions poO AND syncing to db after sessions has been set
  return function thunk(dispatch){
    return dispatch(changeSessionOrdersBulkTC(prodId_and_qty_Arr))
      .then(poOAO=>{
        let poOArr= poOAO.currentPoO
        if(order_id) return dispatch(changePoOinDbTC(order_id, poOArr))
        return poOArr
      })
      .catch(err=>err)
  }
}

export function fetchAllOrders(){
  return function thunk(dispatch){
    return axios.get(`/api/orders/`)
      .then(res => res.data)
      .then(orders => {
        return dispatch(allOrders(orders))
      })
      .catch(err=>err)
  }
}

export function getPoOBulk(Order_ids_Arr){
  return function thunk(dispatch){
    let promiseArr= Order_ids_Arr.map(order_id=>{
      return axios.get(`/api/prodOnOrders/?order_id=${order_id}`)
              .then(res=>{return res})
    })
    return Promise.all(promiseArr)
            .then(poONestedArr=>{
              let totalPoOArr=[]
              poONestedArr.forEach(poOArr=>{totalPoOArr=totalPoOArr.concat(poOArr)})
              return dispatch(authOrderProds(poONestedArr))
            })
  }
}

// THIS IS A MORE OPEN ENDED QUERY FOR ADMIN... (just in case for later.. but not needed for now)
// export function fetchOrders(user_id, status){
//   return function thunk(dispatch){
//     return axios.get(`/api/orders/?user_id=${user_id}&status=${status}`)
//       .then(res => res.data)
//       .then(orders => {})
//       .catch(err=>err)
//   }
// }

export function authUserOrdersThunk (auth_id) {//good job on this alex!  I'm wondering if there is some way to break this doown into smaller chunks (but admittedly I have no idea how)

  return function thunk (dispatch) {

    return axios.get(`/api/orders/?user_id=${auth_id}&status=complete`)
    .then(res => res.data)
    .then(orders => {
      const action = authUserOrders(orders);
      dispatch(action);
      return orders
    })
    .then(orders => {
      return Promise.all(orders.map(order => {
        return axios.get(`/api/prodOnOrders/?order_id=${order.id}`)
      }))
    })
    .then(prods => {
      const action = authOrderProds(prods)
      dispatch(action)
    })
    .catch(err => {
      console.error(err);
    });
  };
}
