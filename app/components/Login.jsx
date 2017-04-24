import React from 'react'
import store from '../store'
import { browserHistory } from 'react-router'

import { receiveIncompleteOrderTC, setCurrentPoOfromDbTC, changePoOinDbTC } from '../reducers/orders'
import { login } from '../reducers/auth'

export class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(this.state.email, this.state.password)
      .then(resolvedVal=>{
        let user_id=resolvedVal.user.id//resolvedVal is just the action object which dispatch(whoami()) (that login eventually calls) returns
        return this.props.receiveIncompleteOrder(user_id)
      })
      .then(resolvedVal=>{//resolvedVal is just the action object which dispatch(receiveOrderAC(order)) (that receiveIncompleteOrder eventually calls) returns
        let prodId_and_qty_Arr= this.props.orders.currentPoO
        let order_id=resolvedVal.order.id
        return prodId_and_qty_Arr.length ? this.props.changePoOinDb(order_id, prodId_and_qty_Arr) : this.props.setCurrentPoOfromDb(order_id)//either change Db to sync with session poO (and set session poO), or simply set session poO from db
      })
      .then(()=>browserHistory.push(`/categories`))//is there a way to make browser refresh at '/' rather than run some of the thunks already running at root??)
      .catch(err=>console.error(err))
    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input type="text" name="email" value={this.state.email} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="text" name="password" value={this.state.password} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>

        </form>

        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/login/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Login! with Google</span>
            </a>
          </p>
        </div>
      </div>
    )
  }
}

import {connect} from 'react-redux'

function mapState({ orders }, ownProps) {
  return { orders }
}

function mapDispatch(dispatch, ownProps) {
  return {
    login: (email, password)=>{
      const thunk = login(email, password)
      return dispatch(thunk) //return so i can .then off it
    },
    receiveIncompleteOrder: (user_id)=>{
      const thunk = receiveIncompleteOrderTC(user_id)
      return dispatch(thunk)
    },
    setCurrentPoOfromDb: (order_id)=>{
      const thunk = setCurrentPoOfromDbTC(order_id)
      return dispatch(thunk)
    },
    changePoOinDb: (order_id, prodId_and_qty_Arr)=>{
      const thunk = changePoOinDbTC(order_id, prodId_and_qty_Arr)
      return dispatch(thunk)
    }
  }
}

const LoginContainer = connect(mapState, mapDispatch)(Login)

export default LoginContainer
