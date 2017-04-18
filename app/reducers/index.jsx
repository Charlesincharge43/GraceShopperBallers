import { combineReducers } from 'redux'
import { recCatReducer, recProdReducer } from './receive'
import { userReducer } from './users'
import { ordersReducer } from './orders'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: recProdReducer,
  categories: recCatReducer,
  users: userReducer,
  orders: ordersReducer,
})

export default rootReducer
