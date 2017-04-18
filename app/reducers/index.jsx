import { combineReducers } from 'redux'
import { recCatReducer, recProdReducer } from './receive'
import { createUserReducer } from './users'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: recProdReducer,
  categories: recCatReducer,
  users: createUserReducer,
})

export default rootReducer
