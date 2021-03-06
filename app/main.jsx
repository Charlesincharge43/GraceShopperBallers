'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios';

import store from './store'
import Root from './components/Root.jsx'
import { receiveCategoriesAC, receiveProductsAC } from './reducers/receive.jsx'
// import { fetchSessionCurrOrdersAC } from './reducers/session.jsx'
import { setCurrentPoOAC, setCurrentPoOfromDbTC, receiveOrderAC, fetchAllOrders, getPoOBulk } from './reducers/orders.jsx'
import { receiveReviewsTC } from './reducers/reviews.jsx'

import Cart from './components/Cart.jsx'
import Categories from './components/Categories.jsx'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Products from './components/Products'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import Home from './components/Home'
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
      return Promise.all([//TURN THIS INTO DISPATCH AND THUNK FORM LATER ON!!!
        axios.get('/api/categories'),
        axios.get('/api/products'),
        axios.get('/api/prodOnOrders/sessionProdOnOrders'),
        user_id ? axios.get(`/api/orders/?user_id=${user_id}&status=incomplete`) : null,
      ].filter(el=>el))//this filters out null from the above ternary    (promise.all with null as an element won't work correctly)
    })
  .then(responses => responses.map(r => r.data))
  .then(([categories, products, sessionPoO, dbIncompleteOrders]) => {
      store.dispatch(receiveCategoriesAC(categories));
      store.dispatch(receiveProductsAC(products))
      if(dbIncompleteOrders){//If dbIncompleteOrders exists (from a logged in user), then pull the associated poO and set currentPoO, otherwise set currentPoO to sessionPoO
        store.dispatch(receiveOrderAC(dbIncompleteOrders[0]))
        let currentOrderID= store.getState().orders.authInCompOrder.id
        store.dispatch(setCurrentPoOfromDbTC(currentOrderID))
      }
      else store.dispatch(setCurrentPoOAC(sessionPoO))

  });
}



const onOrdersEnter = (nextState) => {//this doesnt work if you just reload the orders route (because store.dispatch(whoami()) was moved from store.js to onrootenter... but it needs store.dispatch(whoami()) to finish to get storestate.auth.id
  let storeState = store.getState()
  let auth= storeState.auth
  if (auth.id) {
    if(auth.isAdmin){
      store.dispatch(fetchAllOrders())
        .then(fetchOrdersAO=>{
          // console.log(fetchOrdersAO)
          // console.log('fetchOrdersAO ',fetchOrdersAO)
          // console.log('fetchOrdersAO.allOrders ', fetchOrdersAO.allOrders)
          let ordersArr= fetchOrdersAO.allOrders.map(order=>order.id)
          console.log('ordersArr ', ordersArr)
          return store.dispatch(getPoOBulk(ordersArr))
        })

    }
    else {
      const thunk = authUserOrdersThunk(auth.id);
      store.dispatch(thunk)
    }
  }
}

const singleProductEnter = (nextState) => {
  const product_id= nextState.params.product_id
  store.dispatch(receiveReviewsTC({product_id}))
}

const onProductsEnter = ()=>{//This is necessary so that when people make reviews, they'll refresh on the products page
  return axios.get('/api/products')
    .then(res=>res.data)
    .then(products=>store.dispatch(receiveProductsAC(products)))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} onEnter={onRootEnter}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={ Home } />
        <Route path="/categories" component={Categories} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Categories}/>
        <Route path="/signup" component={Signup} />
        <Route path="/products/filtered" component={Products} onEnter={onProductsEnter}/>
        <Route path="/products/filtered/:category_id" component={Products} onEnter={onProductsEnter}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders} onEnter={onOrdersEnter} />
        <Route path="/products/:product_id" component={singleProduct} onEnter={singleProductEnter}/>
        <Route path="/cart" component={Cart} />
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
