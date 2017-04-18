import { combineReducers } from 'redux'
import { recCatReducer, recProdReducer } from './receive'
import { userReducer } from './users'
import { createBillReducer } from './checkout'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: recProdReducer,
  categories: recCatReducer,
  users: userReducer,
  checkout: createBillReducer
})

export default rootReducer

