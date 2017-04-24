import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { getSessionOrdersTC } from '../reducers/session';
import { setSessionandSyncDbTC, removePoOfromDbTC, removePoOfromSessionsTC } from '../reducers/orders'

class Cart extends React.Component {
  constructor(){
    super()
    this.state={}

    this.handleChange=this.handleChange.bind(this)
    this.saveChanges=this.saveChanges.bind(this)
    this.removePoO=this.removePoO.bind(this)
  }

  handleChange(event) {
    let qty=event.target.value
    let product_id= event.target.name
    this.setState({[product_id]:qty})
  }

  saveChanges(event){
    let prodId_and_qty_Arr= Object.keys(this.state).map(key=>{
      return {product_id: key, qty: this.state[key]}
    })
    let currentOrder_id=this.props.orders.authInCompOrder.id
    this.props.setSessionandSyncDb(currentOrder_id, prodId_and_qty_Arr)
  }

  removePoO(event){

    let currentOrder_id=this.props.orders.authInCompOrder.id
    let product_id= event.target.name
    this.props.removePoOfromDb(currentOrder_id, product_id)
  }

  render(){
    let currentOrder=this.props.orders.currentPoO
    let currentOrder_id=this.props.orders.authInCompOrder.id
    let currentTotal = 0
    function total(price) {
      currentTotal+=price
      return currentTotal
    }
    console.log( 'currentOrder is ', currentOrder )

    return (

      <div>
        <h3>Cart</h3>
        <div className="container">
          {
            currentOrder && currentOrder.map(singleOrder => (
              <table key={singleOrder.product_id} id="cart" className="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-center">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* {console.log('singleOrder',singleOrder.associatedProduct)} */}
                    <td data-th="Product">
                      <div className="row">
                        <div className="col-sm-2 hidden-xs"><img src= { singleOrder.associatedProduct.imageUrl } alt="..." className="img-responsive"/></div>
                        <div className="col-sm-10">
                          <h4 className="nomargin">{ singleOrder.associatedProduct.title }</h4>
                          <p>{ singleOrder.associatedProduct.description }</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">{singleOrder.associatedProduct.price}</td>
                    <td data-th="Quantity">
                      <input type="number" className="form-control text-center" placeholder={singleOrder.qty} name={singleOrder.product_id} onChange={this.handleChange}/>
                    </td>
                    <td data-th="Subtotal" className="text-center">{ total(Number(singleOrder.associatedProduct.price)) }</td>
                    <td className="actions" data-th="">
                      { console.log('singleOrder product id is ', singleOrder.product_id)}
                      <button className="btn btn-danger btn-sm" name={singleOrder.product_id} onClick={ this.removePoO }>x</button>
                    </td>
                  </tr>
                </tbody>
              </table>

            ))}
            <button className="btn btn-info btn-sm" onClick={ this.saveChanges } ><i className="fa fa-refresh">save cart</i></button>
          </div>

          <div className="col-sm-offset-8">
            <table className="table">
              <tfoot>

                <tr className="visible-xs">
                  <td className="text-center"><strong>Total {  }</strong></td>
                </tr>
                <tr>
                  <td><Link to="/categories" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
                  <td colSpan="2" className="hidden-xs"></td>
                  <td className="hidden-xs text-center"><strong>Total ${ total(0) }</strong></td>
                  <td><Link to="/checkout" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      );
  }
}

const mapState = ({ orders }) => ({ orders });

const mapDispatch = (dispatch) => {
  return {
    setSessionandSyncDb: function (order_id, prodId_and_qty_Arr){
      return dispatch(setSessionandSyncDbTC(order_id, prodId_and_qty_Arr))
      },
    removePoOfromDb: function(order_id, product_id){
      if(order_id){
        return dispatch(removePoOfromDbTC(order_id, product_id))
        .then(()=>dispatch(removePoOfromSessionsTC(product_id)))
      }
      else dispatch(removePoOfromSessionsTC(product_id))
    },
  }
}





export default connect(mapState, mapDispatch)(Cart);
