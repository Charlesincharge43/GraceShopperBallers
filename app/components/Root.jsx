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
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#"><img src="http://www.trbimg.com/img-5726ad5d/turbine/bal-terrell-suggs-is-coming-back-on-the-second-season-of-ballers-20160501"></img></a>
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
    </nav>
      {children}
    </div>
    )
  }
)


      // <nav>
      //   <span>Username (placeholder)</span> |
      //   <Link to="/orders" activeClassName="active">Orders</Link> |
      //   <Link to="/signup" activeClassName="active">Sign Up</Link> |
      //   <Link to="/login" activeClassName="active">Log In</Link> |
      //   <Link to="/logout" activeClassName="active">Logout</Link> |
      //   <Link to="/cart" activeClassName="active">Cart</Link>
      //   {/* {user ? <WhoAmI/> : <Login/>} */}
      // </nav>
