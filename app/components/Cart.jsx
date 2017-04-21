import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { getSessionOrdersTC } from '../reducers/session';

const Cart = (props) => {
  let currentOrder=props.orders.currentPoO;

  return (
    <div>
      <h3>Cart</h3>
      <div className="list-group">
      {
        currentOrder && currentOrder.map(singleOrder => (
            <div className="col-xs-4" key={ singleOrder.associatedProduct.id } >
              <Link className="thumbnail" to={`/products/${singleOrder.associatedProduct.id}`} >
                <div className="resizeLrg">
                  <img src={ singleOrder.associatedProduct.imageUrl } />
                </div>
                <div className="caption">
                  <h5>
                    <span>{ singleOrder.associatedProduct.title }</span>
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

const mapState = ({ orders }) => ({ orders });

const mapDispatch = {};



export default connect(mapState, mapDispatch)(Cart);
