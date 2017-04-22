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
import { setCurrentPoOAC, receiveOrderAC } from './reducers/orders.jsx'

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
import {whoami} from './reducers/auth'

const onRootEnter = () => {

  store.dispatch(whoami())// Set the auth info at start... moved it here from store.jsx to main.jsx, so i can .then off it and fetch some needed things
  .then(()=>{
    let user_id= store.getState().auth.id
      return Promise.all([
        axios.get('/api/categories'),
        axios.get('/api/products'),
        axios.get('/api/prodOnOrders/sessionProdOnOrders'),
        user_id ? axios.get(`/api/orders/?user_id=${user_id}&status=incomplete`) : null,
      ].filter(el=>el))//this filters out null from the above ternary    (promise.all with null as an element won't work correctly)
    })
  .then(responses => responses.map(r => r.data))
  .then(([categories, products, sessionPoO, orders]) => {
      store.dispatch(receiveCategoriesAC(categories));
      store.dispatch(receiveProductsAC(products));
      store.dispatch(setCurrentPoOAC(sessionPoO));
      orders && store.dispatch(receiveOrderAC(orders[0]));
  });
}

const onOrdersEnter = (nextState) => {//what is nextState used for?
  axios.get(`/api/orders`)
    .then(res => res.data)
    .then(orders => {
      store.dispatch(allOrders(orders))
    })
    .catch(err => {
      console.error(err)
    })
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
