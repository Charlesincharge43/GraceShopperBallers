import axios from 'axios'

export const ALL_ORDERS = 'ALL_ORDERS'
export const ALL_PRODS_ON_ORDER = 'ALL_PRODS_ON_ORDER'
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

//SUPER CONFUSING!  allOrders consist of order objects, NOT the products associated with the order objects
//currentPoO consist of PRODUCTS associated either unassociated wtih any order objects (if user is guest), or associated with
//the incomplete order in the logged in user's database

//don't get it twisted!!!
let initialState = {
  allOrders: [],//array of order objects
  currentPoO: [],//array of product on orders associated with the current order object
};

export const ordersReducer = (prevState = initialState, action) => {

  const newState = Object.assign({}, prevState)

  switch (action.type) {

    case ALL_ORDERS:

      newState.allOrders = [...action.allOrders];
      return newState;

    case SET_CURRENT_PRODS_ON_ORDER:

      newState.currentPoO = [...action.currentPoO];
      return newState;

    default:
      return prevState;
  }
}


//---------------------------------------------
