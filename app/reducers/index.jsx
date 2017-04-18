import { combineReducers } from 'redux'
import { recCatReducer, recProdReducer } from './receive'
import { userReducer } from './users'
import { createBillReducer } from './checkout'
import { ordersReducer } from './orders'
import { setSessionReducer } from './session'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: recProdReducer,
  categories: recCatReducer,
  users: userReducer,
  checkout: createBillReducer
  orders: ordersReducer,
  session: setSessionReducer,
})

export default rootReducer

