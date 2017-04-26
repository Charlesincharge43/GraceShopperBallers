import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { pushToSessionOrdersTC, changeSessionOrdersTC } from '../reducers/session';
import { setSessionandSyncDbTC } from '../reducers/orders'
import { addProdTC, removeProdTC } from '../reducers/receive'

export class Products extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      prodQty:{},
      addProdSwitch: false,
      title:'',
      description:'',
      price:0,
      inventory:0,
      imageUrl:'',
    }
    this.props.products.forEach(product=>{this.state.prodQty[product.id]=1})
    this.addOrder=this.addOrder.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
// ------
//These are for admin
    this.viewSwitch=this.viewSwitch.bind(this)
    this.titleField=this.titleField.bind(this)
    this.descrField=this.descrField.bind(this)
    this.priceField=this.priceField.bind(this)
    this.invField=this.invField.bind(this)
    this.imageUrlField=this.imageUrlField.bind(this)
    this.addProductBtn=this.addProductBtn.bind(this)
    this.removeProdBtn=this.removeProdBtn.bind(this)
//-------
    this.starRating= this.starRating.bind(this)
    this.numRatings= this.numRatings.bind(this)
  }

  viewSwitch(evt){
    let newBool=!this.state.addProdSwitch
    this.setState({addProdSwitch: newBool})
  }

  titleField(evt){
    let title= evt.target.value
    this.setState({ title })
  }

  descrField(evt){
    let description= evt.target.value
    this.setState({ description })
  }

  priceField(evt){
    let price= evt.target.value
    this.setState({ price })
  }

  invField(evt){
    let inventory= evt.target.value
    this.setState({ inventory })
  }

  imageUrlField(evt){
    let imageUrl= evt.target.value
    this.setState({ imageUrl })
  }

  addProductBtn(evt){
    let prodObj={
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      inventory: this.state.inventory,
      imageUrl: this.state.imageUrl,
      category_id: this.props.params.category_id,
    }
    this.props.addProd(prodObj)
  }

  removeProdBtn(evt){
    let idofProdtoDel=evt.target.value
    this.props.removeProd(idofProdtoDel)
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
  }

  starRating(num, denom){
    return denom ? {width: ((num/denom)*100+'%')} : {width: '0%'}
  }

  numRatings(denom){
    return denom/5 || 0
  }

  filterProducts (productsArr, categoryParam, productSearchArr) {
    console.log('inside of filterProducts')
    if (categoryParam) {
      console.log('typeof categoryParam: ', typeof categoryParam)
      return productsArr.filter(product => {
        return product.category_id === Number(categoryParam)
      })
    } else {
      return productSearchArr
    }
  }

  render(){

    const products = this.filterProducts(this.props.products, this.props.params.category_id, this.props.productSearch.productSearchArr)
    console.log('products from filterProducts function', products)
    const currCategory_id = +this.props.params.category_id;
    let addProdSwitch= this.state.addProdSwitch

    return (
      <div>
        <h3>Products</h3>
        { this.props.auth && this.props.auth.isAdmin ? <button type="submit" className="btn btn-primary" onClick={ this.viewSwitch }> Toggle Add Product </button> : null }
        { addProdSwitch ?
          (
            <div>
              <div><span className="side-margins">Title: </span><input type="text" name="prod-name" className="tiny-form side-margins" placeholder="Enter new product title here" onChange={this.titleField} />
                   <span className="side-margins">Price: </span><input type="text" name="prod-price" className="tiny-form side-margins" placeholder="Enter price here" onChange={this.priceField} />
                   <span className="side-margins">Inventory: </span><input type="text" name="prod-inv" className="tiny-form side-margins" placeholder="Enter inventory here" onChange={this.invField} />
              </div>
              <div><span>Description: </span><input type="text" name="prod-desc" className="medium-form" placeholder="Enter description here" onChange={this.descrField} /></div>
              <div><span>ImageUrl: </span><input type="text" name="prod-url" className="small-form" placeholder="Enter image URL here" onChange={this.imageUrlField} /></div>
              <button type="submit" className="btn btn-primary" onClick={ this.addProductBtn }> Submit </button>
            </div>
          )
          : null }
        <div className="row">
          {
            products && products.map(product => {
                return (
                  <div className="col-xs-4 med-div product" key={ product.id }>
                    { this.props.auth && this.props.auth.isAdmin ? <button type="submit" className="btn btn-danger" value={product.id} onClick={ this.removeProdBtn }> Remove </button> : null }
                    <Link className="thumbnail" to={`/products/${product.id}`} >
                          <div className="resizeMed">
                            <img src={ product.imageUrl } />
                          </div>
                          <div className="caption">
                            <h5>
                              <p>{ product.title }</p>
                              <p>Description: { product.description }</p>
                              <p>Price: $ { product.price }</p>
                              <p>In Stock: { product.inventory }</p>
                            </h5>
                            <div>
                            <div className="star-ratings-css stars-large">
                              <div className="star-ratings-css-top" style={ this.starRating(product.starNum, product.starDenom) }><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                              <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span className='text-small'>({this.numRatings(product.starDenom)})</span></div>
                            </div>
                              <div>Quantity </div>
                              <input type="text" value={this.state.prodQty[product.id]} onClick={(e)=>e.preventDefault()} onChange={this.handleChange} name={product.id} />
                              <button className="btn btn-xs btn-default" value={product.id} onClick={this.addOrder}>Add to Cart</button>
                            </div>
                        </div>
                  </Link>
                </div>
              )
          })
        }
      </div>
    </div>
    );

  }
}

const mapState = ({ auth, products, orders, productSearch }) => ({ auth, products, orders, productSearch });// store.getState().products !!  ... that is passed into products

const mapDispatch = (dispatch)=>(
  {
    // addOnePoOtoSession: function(product_id){
    //   dispatch(pushToSessionOrdersTC(product_id))
    // },
    // setorcreatePoOtoSession: function(product_id, qty){
    //   dispatch(changeSessionOrdersTC(product_id, qty))
    // },
    setSessionandSyncDb: function(order_id, prodId_and_qty_Arr){
      dispatch(setSessionandSyncDbTC(order_id, prodId_and_qty_Arr))
    },
    // addOnePoOtoDb: function(){
    //   dispatch()
    // },
    addProd: function(prodObj){
      dispatch(addProdTC(prodObj))
    },
    removeProd: function(id){
      dispatch(removeProdTC(id))
    },
  }
);

export default connect(mapState, mapDispatch)(Products);
