import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { pushToSessionOrdersTC } from '../reducers/session';

export class Products extends React.Component {
  constructor(){
    super()
    this.addOrder=this.addOrder.bind(this);
  }

  addOrder(evt){
    evt.preventDefault();
    let productID= evt.target.value;
    this.props.addtoOrder(productID);
  }

  render(){
    const products = this.props.products;
    const currCategory_id = +this.props.params.category_id;

    return (
      <div>
        <h3>Products</h3>
        <div className="row">
          {
            products && products.map(product => {
              if(product.category_id === currCategory_id) {
                return (
                  <div className="col-xs-4" key={ product.id }>
                    <Link className="thumbnail" to={`/products/${product.id}`} >
                    <div className="resizeMed">
                      <img src={ product.imageUrl } />
                    </div>
                    <div className="caption">
                      <h5>
                        <p>{ product.title }</p>
                        <p>Description: { product.description }</p>
                        <p>Price: { product.price }</p>
                        <p>In Stock: { product.inventory }</p>
                        <button className="btn btn-xs btn-default" value={product.id} onClick={this.addOrder}>+</button>
                      </h5>
                    </div>
                  </Link>

                </div>
              )
            }
          })

        }
      </div>
    </div>
    );

  }
}



const mapState = ({ products }) => ({ products});// store.getState().products !!  ... that is passed into products

const mapDispatch = (dispatch)=>(
  {
    addtoOrder: function(productID){
      dispatch(pushToSessionOrdersTC(productID))
    }
  }
);

export default connect(mapState, mapDispatch)(Products);
