import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { getSessionOrdersTC } from '../reducers/session';

const Cart = (props) => {
  let currentOrder=props.orders.currentPoO;

  let currentTotal = 0
  function total(price) {
    currentTotal+=price
    return currentTotal
  }

  return (

    <div>
      <h3>Cart</h3>
      {
        currentOrder && currentOrder.map(singleOrder => (

              <div className="container">
            <table id="cart" className="table table-hover table-condensed">
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
                      {console.log('singleOrder',singleOrder.associatedProduct)}
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
                          <input type="number" className="form-control text-center" value="1" />
                        </td>
                        <td data-th="Subtotal" className="text-center">{ total(singleOrder.associatedProduct.price) }</td>
                        <td className="actions" data-th="">
                          <button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
                          <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>                
                        </td>
                      </tr>
                    </tbody>
                    </table>
                    </div>
                    ))}
                      <div className="col-sm-offset-8">
                              <table className="table">
                                          <tfoot>

                                            <tr className="visible-xs">
                                              <td className="text-center"><strong>Total {  }</strong></td>
                                            </tr>
                                            <tr>
                                              <td><a href="#" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                                              <td colspan="2" className="hidden-xs"></td>
                                              <td className="hidden-xs text-center"><strong>Total ${ total(0) }</strong></td>
                                              <td><Link to="/checkout" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link></td>
                                            </tr>
                                          </tfoot>
                                        </table>
                                </div>

                          </div>
  );
}

const mapState = ({ orders }) => ({ orders });

const mapDispatch = {};



export default connect(mapState, mapDispatch)(Cart);
