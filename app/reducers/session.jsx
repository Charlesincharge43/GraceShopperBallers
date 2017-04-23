import axios from 'axios';

import { setCurrentPoOAC } from './orders.jsx'

export const FETCH_SESSION = 'FETCH_SESSION'
export const FETCH_SESSION_ORDERS = 'FETCH_SESSION_ORDERS'


//-------------------------------- FETCH_SESSION ACTION CREATOR AND REDUCER


export const fetchSessionAC = sessionObj => ({
    type: FETCH_SESSION,
    sessionObj: sessionObj,
})

export const fetchSessionCurrOrdersAC = sessionOrdersArr => ({
    type: FETCH_SESSION_ORDERS,
    sessionOrdersArr: sessionOrdersArr,
})

let initialState = {};

export const setSessionReducer = (prevState = initialState, action) => {

  let newState = Object.assign({}, prevState)

  switch (action.type) {

    case FETCH_SESSION:
      newState.sessionObj = action.sessionObj;
      return newState;

    case FETCH_SESSION_ORDERS:
      newState.sessionOrdersArr = action.sessionOrdersArr;
      return newState;

    default:
      return prevState;
  }
}

//-------------------------------- PUSHT

export function pushToSessionOrdersTC (product_id) {

  return function thunk (dispatch) {
    return axios.put('/api/prodOnOrders/add_one_to_session', {product_id})
    .then(res => res.data)
    .then(poOArr => {
      let setCurrentPoOAO = setCurrentPoOAC(poOArr);
      dispatch(setCurrentPoOAO);
    })
    .catch(err => {
      console.error(err);
    });
  };
}

export function changeSessionOrdersTC (product_id, qty) {

  return function thunk (dispatch) {
    return axios.put('/api/prodOnOrders/setorcreate_to_session', {product_id, qty})
    .then(res => res.data)
    .then(poOArr => {
      let setCurrentPoOAO = setCurrentPoOAC(poOArr);
      return dispatch(setCurrentPoOAO);
    })
    .catch(err => {
      console.error(err);
    });
  };
}

export function changeSessionOrdersBulkTC (prodId_and_qty_Arr) {

  return function thunk (dispatch) {
    return axios.put('/api/prodOnOrders/setorcreateBulk_to_session', {prodId_and_qty_Arr})
    .then(res => res.data)
    .then(poOArr => {
      let setCurrentPoOAO = setCurrentPoOAC(poOArr);
      return dispatch(setCurrentPoOAO);
    })
    .catch(err => {
      console.error(err);
    });
  };
}

export function getSessionOrdersTC () {

  return function thunk (dispatch) {
    return axios.get('/api/prodOnOrders/sessionProdOnOrders')
    .then(res => res.data)
    .then(sessionOrdersArr => {
      let fetchSessOrdersAO = fetchSessionCurrOrdersAC(sessionOrdersArr);
      dispatch(fetchSessOrdersAO);
    })
    .catch(err => {
      console.error(err);
    });
  };
}
