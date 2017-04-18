import React from 'react'
import { Link } from 'react-router'

export const Orders = props => {

  const {currentUser, orders} = props

  return (
    <div>
      {
        currentUser ?
        orders.filter(order => {
          return order.user_id === currentUser.id
        })
        : <p>Please login to see order history.</p>
      }
    </div>
  )
}

import {connect} from 'react-redux'

function mapState(state, ownProps) {
  return {
    currentUser: state.currentUser,
    orders: state.orders
  }
}

function mapDispatch(dispatch, ownProps) {
  return {}
}

const OrdersContainer = connect(mapState, mapDispatch)(Orders)

export default OrdersContainer
