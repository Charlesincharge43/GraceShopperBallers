import React from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

import store from '../store'
import { logout } from '../reducers/auth'
import { createBillingInfo, completeOrder, updateOrderPrice, sendEmail } from '../reducers/checkout'
import { emptySessionPoOTC, receiveIncompleteOrderTC } from '../reducers/orders'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      cardNumber: '',
      expDate: '',
      ccvNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {//MAKE THIS DISPATCH TO PROPS LATER
    event.preventDefault()
    const thunk = createBillingInfo(this.state.cardNumber, this.state.expDate, this.state.ccvNumber, this.state.address, this.state.city, this.state.state, this.state.zipCode)
    store.dispatch(thunk)
    const updateOrderPriceThunk = updateOrderPrice(this.props.curPoO)
    store.dispatch(updateOrderPriceThunk)

    //to send email
    const emailThunk = sendEmail(this.state.email)
    store.dispatch(emailThunk)

    if(this.props.user) {
      const completeOrderThunk = completeOrder(this.props.user.id)
      store.dispatch(completeOrderThunk)
        .then(()=>store.dispatch(receiveIncompleteOrderTC(this.props.user.id)))
      store.dispatch(emptySessionPoOTC())

    }
    else {
      const guestCheckout = logout()
      store.dispatch(guestCheckout)
      store.dispatch(emptySessionPoOTC())
    }
    browserHistory.push(`/orders`)
  }

  render () {
  	console.log('this state', this.state)
    return (
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label className="col-sm-2 control-label">email</label>
            <div className="col-sm-10">
              <input type="text" name="email" value={this.state.email} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Credit Card Number</label>
            <div className="col-sm-10">
              <input type="text" name="cardNumber" value={this.state.cardNumber} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Expiry Date</label>
            <div className="col-sm-10">
              <input type="number" name="expDate" value={this.state.expDate} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">CCV Number</label>
            <div className="col-sm-10">
              <input type="number" name="ccvNumber" value={this.state.ccvNumber} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Address</label>
            <div className="col-sm-10">
              <input type="text" name="address" value={this.state.address} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">City</label>
            <div className="col-sm-10">
              <input type="text" name="city" value={this.state.city} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">State</label>
            <div className="col-sm-10">
              <input type="text" name="state" value={this.state.state} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">ZipCode</label>
            <div className="col-sm-10">
              <input type="number" name="zipCode" value={this.state.zipCode} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
    )
  }
}

function mapState(state, ownProps) {
  return {
    user: state.auth,
    curPoO: state.orders.currentPoO,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {}
}

const CheckoutContainer = connect(mapState, mapDispatch)(Checkout)

export default CheckoutContainer
