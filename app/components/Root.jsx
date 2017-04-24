import React from 'react';

import Login from './Login'
import WhoAmI from './WhoAmI'
import {connect, Provider} from 'react-redux'
import { Link } from 'react-router';
import { logout } from '../reducers/auth'
import store from '../store'

function mapState (state, ownProps) {
  return {
    categories: state.categories,
    user: state.auth,
    orders: state.orders,
  }
}

function mapDispatch (dispatch, ownProps) {
  return {
    logoutThunk: function () {
      const thunk = logout();
      dispatch(thunk)
    }
  }
}


//from Charles: are we not using this anymore?  can we delete this block of code if that's the case?
function isLoggedin(user){ //checking to see if user is logged in
  if (user) return (
        <div>
        {console.log(user, 'user*********************')}
          <li>Hello, {user.firstName} </li>
          <li><Link to="/logout" activeClassName="active">Logout</Link></li>
        </div>
  )

  else return (
        <div>
          <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
          <li><Link to="/login" activeClassName="active">Login</Link></li>
        </div>
  )
}

function cartNum(user, orders) {
  let items=0
  for(let poO of orders.currentPoO){
    items+=+poO.qty
  }
  if (items) return (
    <li>
      <Link to="/cart" activeClassName="active">
       <span className="glyphicon glyphicon-shopping-cart">{ items }</span>
      </Link>
    </li>)
  else return (
    <li>
      <Link to="/cart" activeClassName="active">
        <span className="glyphicon glyphicon-shopping-cart"></span>
      </Link>
    </li>)
}



export const Root = connect(mapState, mapDispatch)(
  ({ categories, user, orders, children, logoutThunk }) =>{//Whatever child component is clicked will be the children (e.g., anything under root)
  //whatever mapstoprops is will determine what user is logged in!! So figure out how the auth works
    return (

          <div>
          <nav role="navigation" className="navbar navbar-inverse">
          <div className="navbar-header">
              <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              {/* <a href="#" className="navbar-brand"> */}
                <Link to="/categories" className="navbar-brand">
                  <img src="https://fanart.tv/fanart/tv/281714/hdtvlogo/ballers-5529a2fa52e21.png"></img>
                </Link>
              {/* </a> */}
          </div>

          <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                  <li className="dropdown">
                      <a data-toggle="dropdown" className="dropdown-toggle" href="#">Products <b className="caret"></b></a>
                      <ul role="menu" className="dropdown-menu">
                        { categories.map(category=>{
                          return (<li><Link to={`/categories/${category.id}`} key={category.id}>{category.name}</Link></li>)
                        })}
                      </ul>
                  </li>
                  <li><Link to="/orders" activeClassName="active">Orders</Link></li>
              </ul>
              <form role="search" className="navbar-form navbar-left">
                  <div className="form-group">
                      <input type="text" placeholder="Search" className="form-control" />
                  </div>
              </form>
              <ul className="nav navbar-nav navbar-right">
                {
                  user ? (<div className= "nav navbar-nav ">
                            <li><h4 className= "text-wh">Hello, {user.firstName} </h4></li>
                            <li><Link to="/logout" activeClassName="active" onClick={logoutThunk} >Logout</Link></li>
                          </div>)

                       : (<div className= "nav navbar-nav ">
                            <li><Link to="/login" activeClassName="active">Login</Link></li>
                            <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
                          </div>)
                }
                {cartNum(user, orders)}
              </ul>
          </div>
      </nav>
      {children}
    </div>
    )
  }
)
//comment
{/*
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#"><img src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiXhc765rDTAhUp0oMKHaHWDYgQjBwIBA&url=https%3A%2F%2Ffanart.tv%2Ffanart%2Ftv%2F281714%2Fhdtvlogo%2Fballers-5529a2fa52e21.png&psig=AFQjCNEXQDBfJ8yB-8_K9v7mChPn2UG8rg&ust=1492701054215976"></img></a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/categories" activeClassName="active">Categories</Link></li>
          <li><Link to="/orders" activeClassName="active">Orders</Link></li>
          <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
          <li><Link to="/login" activeClassName="active">Log In</Link></li>
          <li><Link to="/logout" activeClassName="active">Logout</Link></li>
          <li><Link to="/cart" activeClassName="active">Cart</Link></li>
        </ul>
      </div>
*/}
