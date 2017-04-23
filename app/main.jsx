'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios';

import store from './store'
import { Root } from './components/Root.jsx'
import { receiveCategoriesAC, receiveProductsAC } from './reducers/receive.jsx'
// import { fetchSessionCurrOrdersAC } from './reducers/session.jsx'
import { setCurrentPoOAC, setCurrentPoOfromDbTC, receiveOrderAC, } from './reducers/orders.jsx'

import Cart from './components/Cart.jsx'
import Categories from './components/Categories.jsx'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Products from './components/Products'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import { allOrders } from './reducers/orders'
import singleProduct from './components/singleProduct'
import { logout } from './reducers/auth'
import WhoAmI from './components/WhoAmI'
import { authUserOrdersThunk } from './reducers/orders'
import {whoami} from './reducers/auth'

const onRootEnter = () => {
  //Note, apparently you CAN .then off a dispatch!!!!  See notes at the bottom of this file

  store.dispatch(whoami())// Set the auth info at start... moved it here from store.jsx to main.jsx, so i can .then off it and fetch some needed things
  .then(()=>{
    let user_id= store.getState().auth.id
      return Promise.all([//TURN OFF THIS INTO DISPATCH AND THUNK FORM LATER ON!!!
        axios.get('/api/categories'),
        axios.get('/api/products'),
        axios.get('/api/prodOnOrders/sessionProdOnOrders'),
        user_id ? axios.get(`/api/orders/?user_id=${user_id}&status=incomplete`) : null,
      ].filter(el=>el))//this filters out null from the above ternary    (promise.all with null as an element won't work correctly)
    })
  .then(responses => responses.map(r => r.data))
  .then(([categories, products, sessionPoO, dbIncompleteOrders]) => {
      store.dispatch(receiveCategoriesAC(categories));
      store.dispatch(receiveProductsAC(products))//uncomment after your testing shiz
      if(dbIncompleteOrders){//If dbIncompleteOrders exists (from a logged in user), then pull the associated poO and set currentPoO, otherwise set currentPoO to sessionPoO
        store.dispatch(receiveOrderAC(dbIncompleteOrders[0]))//apparently dispatching an action object is SYNCHRONOUS, so no need to try .thening off it (not that you can.. although you could do a promise.resolve)
        let currentOrderID= store.getState().orders.authInCompOrder.id
        store.dispatch(setCurrentPoOfromDbTC(currentOrderID))
      }
      else store.dispatch(setCurrentPoOAC(sessionPoO))

  });
}

const onOrdersEnter = (nextState) => {
  let storeState = store.getState();
  let auth_id = storeState.auth.id;
  const thunk = authUserOrdersThunk(auth_id);
  store.dispatch(thunk)
}

// const onCartEnter = () => {
//   axios.get('/api/prodOnOrders/sessionProdOnOrders')
//     .then((r)=>{
//       store.dispatch(setCurrentPoOAC(r.data))
//     })
// }


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} onEnter={onRootEnter}>
        <IndexRedirect to="/categories" />
        <Route path="/categories" component={Categories} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Categories}/>
        <Route path="/signup" component={Signup} />
        <Route path="/categories/:category_id" component={Products}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders} onEnter={onOrdersEnter} />
        {/* <Route path="/item" component={Item}/> */}
        <Route path="/products/:product_id" component={singleProduct}/>
        {/* <Route path="/orders" component={Orders}/>*/}
         <Route path="/cart" component={Cart} />
        {/*<Route path="/cart" component={Checkout}/> */}
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)




//REALLY COOL STUFF:

// store.dispatch(setCurrentPoOAC(sessionPoO))

// if you console.dir the above, you'll see you get an object (from the reducer, which
// becomes a value for one of the keys in the store)

// store.dispatch(whoami())
//
// if you console.dir the above, you'll see you don't get an object, but a PROMISE!!! why is that?  Because whoami()
// is a thunk creator, and inside the thunk which gets dispatched, it returns an AXIOS request (with another dispatch nested inside), and
// because it returns an axios request, it is returning a promise, and not an object!  so you can .then off it!
