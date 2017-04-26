import { combineReducers } from 'redux'
import { recCatReducer, recProdReducer } from './receive'
import { createBillReducer } from './checkout'
import { ordersReducer } from './orders'
import { setSessionReducer } from './session'
import { searchReducer } from './search'
import { reviewsReducer } from './reviews.jsx'//WHAT THE HELL... WHY THE OTHER ONES I DONT NEED TO SAY jsx, BUT FOR THIS ONE IT'LL ASSUME js ????

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: recProdReducer,
  categories: recCatReducer,
  checkout: createBillReducer,
  orders: ordersReducer,
  session: setSessionReducer,
  reviews: reviewsReducer,
  productSearch: searchReducer,
})

export default rootReducer
