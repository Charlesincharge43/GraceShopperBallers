import React from 'react'
import { Link } from 'react-router'

export class Orders extends React.Component {
  constructor() {
    super()

  }

  render () {

    const { auth, orders, authCompOrders, prodsOnOrders } = this.props
    console.log('prodsOnOrders', prodsOnOrders)

    return (
      <div>
        {
          auth ?
            authCompOrders.length > 0 ?
            authCompOrders.map((order, i) => {
              return <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Order No. {order.id}</h3>
                </div>
                {
                  prodsOnOrders.length > 0 &&
                  prodsOnOrders[i].data.map(prod => {
                    return <div className="panel-body">
                      Product Id {prod.product_id} -- {prod.associatedProduct.title} {prod.associatedProduct.description} -- Price: ${prod.price}
                    </div>
                  })
                }
              </div>
            })
            : <p>You do not have any completed orders.</p>
          : <p>Please login to see order history.</p>
        }
      </div>
    )

  }

}

import {connect} from 'react-redux'

function mapState(state, ownProps) {
  return {
    auth: state.auth,
    orders: state.orders,
    authCompOrders: state.orders.authCompOrders,
    prodsOnOrders: state.orders.prodsOnOrders,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {}
}

const OrdersContainer = connect(mapState, mapDispatch)(Orders)

export default OrdersContainer

/* product on order

{price: null, qty: 1, product_id: 3, order_id: null, associatedProduct: {id: 3, title: ‘Jeremy Lin Signed basketball’, description: ‘Signed by the best 3 week flash in the pan wonder in basketball history’, price: 1000000, inventory: 2, imageUrl: ’http://assets.nydailynews.com/polopoly_fs/1.1019747.1330898515!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/10682257.jpg'} }

{price: null, qty: 2, product_id: 1, order_id: null, associatedProduct: {id: 1, title: ‘Lebrrn’, description: ‘jersey for cavs bandwagon fans’, price: 1, inventory: 100, imageUrl: ’https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg'} }

*/
