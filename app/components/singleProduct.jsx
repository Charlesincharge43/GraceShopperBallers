import React from 'react'
import { connect } from 'react-redux'

import { postReviewthenReceiveAllTC } from '../reducers/reviews'


class SingleProduct extends React.Component {
  constructor(props){
    super(props)
    const currProduct_id = +props.params.product_id;
    const product=props.products.filter((product)=>(product.id===currProduct_id))[0];

    this.state={comments: "", rating: 1, selectedProduct: product}

    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.handleChangeStar= this.handleChangeStar.bind(this)
  }

  handleChange(evt){
    let val= evt.target.value
    this.setState({comments: val})
  }
  handleChangeStar(evt){
    let val= evt.target.value
    this.setState({rating: val})
  }

  handleSubmit(evt){
    evt.preventDefault()
    let newReviewObj= {
      rating: this.state.rating,
      comments: this.state.comments,
      user_id: this.props.auth.id,
      product_id: this.state.selectedProduct.id,
    }
    this.props.postReviewthenReceiveAll(newReviewObj)
  }

  render(){
    let product= this.state.selectedProduct
    return (
      product ?

      <div>

        <div className="centerContainer">
          <hr/>
          <div className="item-container">
            <div className="col-xs-4">
              <div className="resizeMed">
                <img src={ product.imageUrl } />
              </div>
            </div>
            <div className="caption">
              <h3>{ product.title }</h3>
              <h5>
                <p>Description: { product.description }</p>
                <p>Price: { product.price }</p>
                <p>In Stock: { product.inventory }</p>
              </h5>
              {
                this.props.auth
                ?
                <div>
                  <h4 className="text-center">Write Your Review
                  </h4>
                  <input type="text" name="review" className="medium-form" placeholder="Enter text here" onChange={this.handleChange} />
                  <select onChange={this.handleChangeStar}>
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </div>
                :
                <h4 className="text-center">Please Login to Submit a Review</h4>
              }
            </div>
          </div>
          <hr/>
          {this.props.reviews && this.props.reviews.map(review=>{
            let percentage=(review.rating/5)*100+'%'
            return (
            <div>
                <div className="star-ratings-css stars-small">
                  <div className="star-ratings-css-top" style={{width: percentage}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                  <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                </div>
                <h5 className="text-center">by {review.user.firstName}</h5>
                <h4 className="text-center">{review.comments}</h4>
                <hr/>
            </div>
            )
          })}
        </div>

      </div>

      : <div></div>
    )
  }
}



const mapState = ({ products, auth, reviews }) => ({ products, auth, reviews});

const mapDispatch = (dispatch)=> (
  {
    postReviewthenReceiveAll: function(reviewObj){
      dispatch(postReviewthenReceiveAllTC(reviewObj))
    }
  }
);

export default connect(mapState, mapDispatch)(SingleProduct);
