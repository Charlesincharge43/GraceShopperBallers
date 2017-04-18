import React from 'react';
import Login from './Login'//Why need the extension here????
import WhoAmI from './WhoAmI'
import {connect, Provider} from 'react-redux'
import { Link } from 'react-router';

export const Root = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>{//Whatever child component is clicked will be the children (e.g., anything under root)
  //whatever mapstoprops is will determine what user is logged in!! So figure out how the auth works
    return (
    <div>
      <nav>
        <span>Username (placeholder)</span> |
        <Link to="/orders" activeClassName="active">Orders</Link> |
        <Link to="/signup" activeClassName="active">Sign Up</Link> |
        <Link to="/login" activeClassName="active">Log In</Link> |
        <Link to="/logout" activeClassName="active">Logout</Link> |
        <Link to="/cart" activeClassName="active">Cart</Link>
        {/* {user ? <WhoAmI/> : <Login/>} */}
      </nav>
      {children}
    </div>
    )
  }
)
