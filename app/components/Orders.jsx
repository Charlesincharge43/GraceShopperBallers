import React from 'react'
import { Link } from 'react-router'

export class Orders extends React.Component {
  constructor() {
    super()

  }

  componentDidMount () {
    if (this.props.auth) {
      this.props.authOrdersThunk(this.props.auth.id)
    }
  }

  render () {

    const {auth, orders} = this.props

    return (
      <div>
        {
          auth ?
          <p>There is a user</p>
          : <p>Please login to see order history.</p>
        }
      </div>
    )

  }

}

import {connect} from 'react-redux'
import { authUserOrdersThunk } from '../reducers/orders'

function mapState(state, ownProps) {
  return {
    auth: state.auth,
    orders: state.orders
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    authOrdersThunk: function (auth_id) {
      const thunk = authUserOrdersThunk(auth_id)
      dispatch(thunk)
    }
  }
}

const OrdersContainer = connect(mapState, mapDispatch)(Orders)

export default OrdersContainer

/* product on order:

{price: null, qty: 1, product_id: 3, order_id: null, associatedProduct: {id: 3, title: ‘Jeremy Lin Signed basketball’, description: ‘Signed by the best 3 week flash in the pan wonder in basketball history’, price: 1000000, inventory: 2, imageUrl: ’http://assets.nydailynews.com/polopoly_fs/1.1019747.1330898515!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/10682257.jpg'} }

{price: null, qty: 2, product_id: 1, order_id: null, associatedProduct: {id: 1, title: ‘Lebrrn’, description: ‘jersey for cavs bandwagon fans’, price: 1, inventory: 100, imageUrl: ’https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg'} }

*/
