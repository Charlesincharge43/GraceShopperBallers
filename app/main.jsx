'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios';

import store from './store'
import { Root } from './components/Root.jsx'
import { receiveCategoriesAC, receiveProductsAC } from './reducers/receive.jsx'
import Categories from './components/Categories.jsx'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Products from './components/Products'
import Orders from './components/Orders'
import { allOrders } from './reducers/orders'

const onRootEnter = function () {

  Promise.all([
    axios.get('/api/categories'),
    axios.get('/api/products'),
  ])
    .then(responses => responses.map(r => r.data))
    .then(([categories, products]) => {
      store.dispatch(receiveCategoriesAC(categories));
      store.dispatch(receiveProductsAC(products));
    });

};

const onOrdersEnter = (nextState) => {
  axios.get(`/api/orders`)
    .then(res => res.data)
    .then(orders => {
      store.dispatch(allOrders(orders))
    })
    .catch(err => {
      console.error(err)
    })
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} onEnter={onRootEnter}>
        <IndexRedirect to="/categories" />
        <Route path="/categories" component={Categories} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/categories/:category_id" component={Products}/>
        <Route path="/orders" component={Orders} onEnter={onOrdersEnter} />
        {/* <Route path="/item" component={Item}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/cart" component={Checkout}/> */}
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
