import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { pushToSessionOrdersTC, changeSessionOrdersTC } from '../reducers/session';
import { setSessionandSyncDbTC } from '../reducers/orders'

export class Products extends React.Component {
  constructor(props){
    super(props)
    this.state= {prodQty:{}}
    this.props.products.forEach(product=>{this.state.prodQty[product.id]=1})
    this.addOrder=this.addOrder.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(evt){
    let target= evt.target
    let prodQty={}
    prodQty[target.name]=target.value
    this.setState({prodQty})
  }

  addOrder(evt){
    evt.preventDefault();
    let product_id= evt.target.value
    let qty= this.state.prodQty[product_id]
    let order_id= this.props.orders.authInCompOrder ? this.props.orders.authInCompOrder.id : null
    let prodId_and_qty_Arr=[{product_id, qty}]
    this.props.setSessionandSyncDb(order_id, prodId_and_qty_Arr)
    // this.props.setorcreatePoOtoSession(product_id, qty)
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
                        </h5>
                        <div>  {/*  can't get row to work */}
                          <div>Quantity </div>
                          <input type="text" value={this.state.prodQty[product.id]} onClick={(e)=>e.preventDefault()} onChange={this.handleChange} name={product.id} />
                          <button className="btn btn-xs btn-default" value={product.id} onClick={this.addOrder}>Add to Cart</button>
                        </div>
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

const mapState = ({ products, orders }) => ({ products, orders });// store.getState().products !!  ... that is passed into products

const mapDispatch = (dispatch)=>(
  {
    addOnePoOtoSession: function(product_id){
      dispatch(pushToSessionOrdersTC(product_id))
    },
    setorcreatePoOtoSession: function(product_id, qty){
      dispatch(changeSessionOrdersTC(product_id, qty))
    },
    setSessionandSyncDb: function(order_id, prodId_and_qty_Arr){
      dispatch(setSessionandSyncDbTC(order_id, prodId_and_qty_Arr))
    },
    addOnePoOtoDb: function(){
      dispatch()
    },
  }
);

export default connect(mapState, mapDispatch)(Products);
