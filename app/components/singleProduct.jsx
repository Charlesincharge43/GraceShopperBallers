import React from 'react';
import { connect } from 'react-redux'

const singleProduct = (props) => {
  const products = props.products;
  const currProduct_id = +props.params.product_id;
  const product=products.filter((product)=>(product.id===currProduct_id))[0];

  return (
    <div>
      <h3>{ product.title }</h3>
      <div className="row">
            <div className="col-xs-4">
                <div className="resizeMed">
                  <img src={ product.imageUrl } />
                </div>
                <div className="caption">
                  <h5>
                    <p>{ product.title }</p>
                    <p>Description: { product.description }</p>
                    <p>Price: { product.price }</p>
                    <p>In Stock: { product.inventory }</p>
                    <p>***Review Placeholder!!!!! ***</p>
                  </h5>
                </div>
            </div>
      </div>
    </div>
  );
}

const mapState = ({ products }) => ({ products});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(singleProduct);
