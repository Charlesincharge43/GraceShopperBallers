import React from 'react'
import { connect } from 'react-redux'

const Cart = (props) => {

  //const currentOrder = props.currentOrder **********

  return (
    <div>
      <h3>Cart</h3>
      <div className="row">
      {
        currentOrder && currentOrder.map(singleOrder => (
          <div className="col-xs-4" key={ singleOrder.id } >
            <Link className="thumbnail" to={`/product/${singleOrder.id}`} >
              <div className="resizeLrg">
                <img src={ singleOrder.imageUrl } />
              </div>
              <div className="caption">
                <h5>
                  <span>{ singleOrder.title }</span>
                </h5>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  );
}

const mapState = ({ currentOrder }) => ({ currentOrder });// store.getState().categories !!  ... that is passed into categories

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Cart);