import axios from 'axios'

export const ALL_ORDERS = 'ALL_ORDERS'
export const AUTH_USER_ORDERS = 'AUTH_USER_ORDERS'
export const ALL_PRODS_ON_ORDER = 'ALL_PRODS_ON_ORDER'

export const AUTH_ORDER_PRODS = 'AUTH_ORDER_PRODS'
export const SET_CURRENT_PRODS_ON_ORDER = 'SET_CURRENT_PRODS_ON_ORDER'


//-------------------------------- orders ACTION CREATOR AND REDUCER

export const allOrders = orders => ({
    type: ALL_ORDERS,
    allOrders
})

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
let initialState = {
  allOrders: [],//array of order objects
  authCompOrders: [],

  prodsOnOrders: [],
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

    default:
      return prevState;
  }
}


//--------------------------------------------- THUNKS

export function authUserOrdersThunk (auth_id) {

  return function thunk (dispatch) {

    return axios.get(`/api/orders/?user=${auth_id}&status=complete`)
    .then(res => res.data)
    .then(orders => {
      console.log('orders from axios ... ', orders)
      const action = authUserOrders(orders);
      dispatch(action);

      return orders
    })
    .then(orders => {
      console.log('orders from before PromiseAll', orders)
      return Promise.all(orders.map(order => {
        console.log('order from PromiseAll', order)
        return axios.get(`/api/prodOnOrders/?order_id=${order.id}`)
      }))
    })
    .then(res => {
      console.log('res from PromiseAll', res)
      return res
    })
    .then(prods => {
      console.log('prods from PromiseAll in authOrderProds', prods)
      const action = authOrderProds(prods)
      dispatch(action)
    })
    .catch(err => {
      console.error(err);
    });
  };
}
