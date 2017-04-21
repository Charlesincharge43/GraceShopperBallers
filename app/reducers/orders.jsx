import axios from 'axios'

export const ALL_ORDERS = 'ALL_ORDERS'
export const ALL_PROD_ON_ORDER = 'ALL_PROD_ON_ORDER'
export const AUTH_USER_ORDERS = 'AUTH_USER_ORDERS'
export const AUTH_ORDER_PRODS = 'AUTH_ORDER_PRODS'

//-------------------------------- createUser ACTION CREATOR AND REDUCER


export const allOrders = orders => ({
    type: ALL_ORDERS,
    orders
})

export const authUserOrders = orders => ({
    type: AUTH_USER_ORDERS,
    orders
})

export const authOrderProds = prodsOnOrders => ({
    type: AUTH_ORDER_PRODS,
    prodsOnOrders
})

export function authUserOrdersThunk (auth_id) {

  return function thunk (dispatch) {

    return axios.get(`/api/orders/${auth_id}`)
    .then(res => res.data)
    .then(orders => {
      const action = authUserOrders(orders);
      dispatch(action);
      return orders
    })
    .then(orders => {
      return Promise.all(orders.map(order => {
        return axios.get(`/api/prodOnOrder/${order.id}`)
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

let initialState = {
  orders: [],
  authOrders: [],
  prodsOnOrders: [],
};

export const ordersReducer = (prevState = initialState, action) => {

  const newState = Object.assign({}, prevState)

  switch (action.type) {

    case ALL_ORDERS:

      newState.orders = [...action.orders];
      return newState;

    case AUTH_USER_ORDERS:

      newState.authOrders = [...action.orders];
      return newState;

    case AUTH_ORDER_PRODS:

      newState.prodsOnOrders = [...action.prodsOnOrders];
      return newState;

    default:
      return prevState;
  }
}
