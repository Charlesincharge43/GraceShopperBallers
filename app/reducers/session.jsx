import axios from 'axios';

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

export function pushToSessionOrdersTC (PoO) {//Product on Order

  return function thunk (dispatch) {

    return axios.post('/api/orders/currentOrder', {PoO})
    .then(res => res.data)
    .then(sessionOrdersArr => {
      console.log('hello in pushToSessionOrdersTC')
      let fetchSessOrdersAO = fetchSessionCurrOrdersAC(sessionOrdersArr);
      dispatch(fetchSessOrdersAO);
    })
    .catch(err => {
      console.error(err);
    });
  };
}
