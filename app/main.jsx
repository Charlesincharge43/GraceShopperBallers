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
import { setCurrentPoOAC } from './reducers/orders.jsx'

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

const onRootEnter = () => {

  Promise.all([
    axios.get('/api/categories'),
    axios.get('/api/products'),
    axios.get('/api/prodOnOrders/sessionProdOnOrders'), //this won't work on root enter.. session is undefined this early for some reason **
  ])
    .then(responses => responses.map(r => r.data))
    .then(([categories, products, sessionPoO]) => {
      store.dispatch(receiveCategoriesAC(categories));
      store.dispatch(receiveProductsAC(products));
      store.dispatch(setCurrentPoOAC(sessionPoO));
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
