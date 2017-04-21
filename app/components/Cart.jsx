import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

const Cart = (props) => {
  // let currentOrder=props.currentOrder;



  //DUMMY CURRENTORDER (DELETE LATER)
  //this is not an actual row of orders... rather it's the array of product on orders linked to the order in the table that is incomplete
  // (or the array of products that is the value of the session.currentOrder)



  let currentOrder=[
    {price: null, qty: 1, product_id: 3, order_id: null, associatedProduct: {id: 3, title: 'Jeremy Lin Signed basketball', description: 'Signed by the best 3 week flash in the pan wonder in basketball history', price: 1000000, inventory: 2, imageUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1019747.1330898515!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/10682257.jpg'} },//session order will have a null order_id
    {price: null, qty: 2, product_id: 1, order_id: null, associatedProduct: {id: 1, title: 'Lebrrn', description: 'jersey for cavs bandwagon fans', price: 1, inventory: 100, imageUrl: 'https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg'} }//lebron jersey
  ]

  // props.currentOrder=[
  //   {price: null, qty: 1, product_id: 3, order_id: 2},// example of product on order where the user is LOGGED IN (in which case he/she has an order row that is incomplete, which this order_id points to)
  //   {price: null, qty: 2, product_id: 1, order_id: 2},
  // ]

  let currentTotal = 0
  function total(price) {
    currentTotal+=price
    return currentTotal
  }

  console.log('at cart');
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

const mapState = ({ currentOrder }) => ({ currentOrder });// store.getState().categories !!  ... that is passed into categories

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Cart);
