import React from 'react';
import { browserHistory } from 'react-router'

import Login from './Login'
import WhoAmI from './WhoAmI'
import {Provider} from 'react-redux'
import Footer from './Footer'
import { Link } from 'react-router';
import { logout } from '../reducers/auth'
import store from '../store'
import { setProductSearchArr } from '../reducers/search'


class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      productSearch: '',
    }

    this.cartNum = this.cartNum.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.filterProductsArr = this.filterProductsArr.bind(this)
  }

  filterProductsArr (productsArr) {
    return productsArr.filter(product => {
        return product.title.toLowerCase().match(this.state.productSearch.toLowerCase())
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.productSearchArrThunk(this.filterProductsArr(this.props.products))
    this.setState({productSearch: ''})
    browserHistory.push(`/products/filtered`)
  }

  isLoggedin (user) {
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

  cartNum (user, orders) {
    let items=0
      for(let poO of orders.currentPoO){
        items+=+poO.qty
      }
      if (items) return (
        <li>
          <Link to="/cart" activeClassName="active">
           <span className="glyphicon glyphicon-shopping-cart"><span className="orange-text">{ items }</span></span>
          </Link>
        </li>)
      else return (
        <li>
          <Link to="/cart" activeClassName="active">
            <span className="glyphicon glyphicon-shopping-cart"></span>
          </Link>
        </li>)
  }

  render () {

    const { categories, user, orders, children, logoutThunk, products } = this.props//Whatever child component is clicked will be the children (e.g., anything under root)
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
                            return (<li><Link to={`/products/filtered/${category.id}`} key={category.id}>{category.name}</Link></li>)
                          })}
                        </ul>
                    </li>
                    <li><Link to="/orders" activeClassName="active">Orders</Link></li>
                </ul>
                <form role="search" className="navbar-form navbar-left">
                    <div className="form-group">
                        <input type="text" name="productSearch" value={this.state.productSearch} placeholder="Search" className="form-control" onChange={this.handleChange} />
                        <button id="nav-search" type="button" className="btn btn-default btn-xs" onClick={this.handleSubmit} >
                          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                    </div>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  {/* NEXT TIME JUST MAKE THE BELOW INTO A METHOD IN THE CLASS... !!!! e.g., isLoggedIn which would do render */}
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
                  {this.cartNum(user, orders)}
                </ul>
            </div>
        </nav>
        {children}
      </div>
      )
    }
  }



import {connect} from 'react-redux'

function mapState (state, ownProps) {
  return {
    categories: state.categories,
    user: state.auth,
    orders: state.orders,
    products: state.products,
  }
}

function mapDispatch (dispatch, ownProps) {
  return {
    logoutThunk: function () {
      const thunk = logout();
      dispatch(thunk)
    },
    productSearchArrThunk: function (productArr) {
      dispatch(setProductSearchArr(productArr))
    }
  }
}

const RootContainer = connect(mapState, mapDispatch)(Root)

export default RootContainer
