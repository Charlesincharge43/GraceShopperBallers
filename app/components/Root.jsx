import React from 'react';
import Login from './Login'//Why need the extension here????
import WhoAmI from './WhoAmI'
import {connect, Provider} from 'react-redux'
import { Link } from 'react-router';

function isLoggedin(user){ //checking to see if user is logged in 
  if (user) return (<li><Link to="/logout" activeClassName="active">Logout</Link></li>)
  else return (
        <div>
          <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
          <li><Link to="/login" activeClassName="active">Login</Link></li>
        </div>
  )
}

export const Root = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>{//Whatever child component is clicked will be the children (e.g., anything under root)
  //whatever mapstoprops is will determine what user is logged in!! So figure out how the auth works
  console.log('user', user)
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
              <a href="#" className="navbar-brand"><Link to="/categories"><img src="https://fanart.tv/fanart/tv/281714/hdtvlogo/ballers-5529a2fa52e21.png"></img></Link></a>
          </div>

          <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                  <li className="dropdown">
                      <a data-toggle="dropdown" className="dropdown-toggle" href="#">Products <b className="caret"></b></a>
                      <ul role="menu" className="dropdown-menu">
                          <li><Link to="/categories/1">Jerseys</Link></li>
                          <li><Link to="/categories/2">Shoes</Link></li>
                          <li><Link to="/categories/3">Memoribilia</Link></li>
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
                  {isLoggedin(user)}
                  <li><Link to="/cart" activeClassName="active"><span class="glyphicon glyphicon-shopping-cart"></span>Cart</Link></li>
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
