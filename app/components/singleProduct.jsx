import React from 'react'
import { connect } from 'react-redux'

import { postReviewthenReceiveAllTC } from '../reducers/reviews'


class SingleProduct extends React.Component {
  constructor(props){
    super(props)
    const currProduct_id = +props.params.product_id;
    const product=props.products.filter((product)=>(product.id===currProduct_id))[0];// in the future this should not be done here!!!
    //just keep the logic and allthat in the reducer (and then run the function exported by it)

    this.state={comments: "", rating: 1, selectedProduct: product}

    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.handleChangeStar= this.handleChangeStar.bind(this)

    //this is for subtotals
    this.subNumReviews= this.subNumReviews.bind(this)
    this.starSubRating= this.starSubRating.bind(this)
    this.filterByStar= this.filterByStar.bind(this)
    this.percentage= this.percentage.bind(this)
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

  starRating(num, denom){
    return denom ? {width: ((num/denom)*100+'%')} : {width: '0%'}
  }

  filterByStar(numStars){
    let filteredReviews= this.props.reviews.filter(review=>review.rating===numStars)
    return filteredReviews
  }

  percentage(numStars){
    let percentage= Math.round(this.props.reviews.length ? this.filterByStar(numStars).length/this.props.reviews.length * 100 : 0)
    return " "+percentage+"%"
  }

  starRating(num, denom){
    return denom ? {width: ((num/denom)*100+'%')} : {width: '0%'}
  }

  numRatings(denom){
    return denom/5 || 0
  }

  subNumReviews(numStars){
    return this.filterByStar(numStars).length
  }

  starSubRating(numStars){
    let width= this.props.reviews.length ? this.filterByStar(numStars).length/this.props.reviews.length * 100 : 0
    return {width: width+"%"}
  }

  render(){
    let product= this.state.selectedProduct
    return (
      product ?
        <div className="centerContainer">
          <hr/>
          <div className="item-container">

            <div className="col-xs-4">
              <div className="resizeMed">
                <img src={ product.imageUrl } />
              </div>
            </div>

            <div className="col-xs-4">
              <div className="caption">
                <h3>{ product.title }</h3>
                <h5>
                  <p>Description: { product.description }</p>
                  <p>Price: $ { product.price }</p>
                  <p>In Stock: { product.inventory }</p>
                </h5>
              </div>
            </div>

            {/*  need to save this into a component so you can just easily render it whenever you want and make it more modular */}
            <div className="col-xs-4">
              <div className="star-ratings-css stars-large">
                <div className="star-ratings-css-top" style={this.starRating(product.starNum, product.starDenom)}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span className='text-small'>({this.numRatings(product.starDenom)})</span></div>
              </div>

              <div>
                <span className="bar-text">5 stars ({this.subNumReviews(5)}) {this.percentage(5)}</span>
                  <div className="bar-ratings bar-large">
                    <div className="bar-ratings-top" style={this.starSubRating(5)}></div>
                    <div className="bar-ratings-bottom"></div>
                  </div>
              </div>

              <div>
                <span className="bar-text">4 stars ({this.subNumReviews(4)}) {this.percentage(4)}</span>
                  <div className="bar-ratings bar-large">
                    <div className="bar-ratings-top" style={this.starSubRating(4)}></div>
                    <div className="bar-ratings-bottom"></div>
                  </div>
              </div>

              <div>
                <span className="bar-text">3 stars ({this.subNumReviews(3)}) {this.percentage(3)}</span>
                  <div className="bar-ratings bar-large">
                    <div className="bar-ratings-top" style={this.starSubRating(3)}></div>
                    <div className="bar-ratings-bottom"></div>
                  </div>
              </div>

              <div>
                <span className="bar-text">2 stars ({this.subNumReviews(2)}) {this.percentage(2)}</span>
                  <div className="bar-ratings bar-large">
                    <div className="bar-ratings-top" style={this.starSubRating(2)}></div>
                    <div className="bar-ratings-bottom"></div>
                  </div>
              </div>

              <div>
                <span className="bar-text">1 stars ({this.subNumReviews(1)}) {this.percentage(1)}</span>
                  <div className="bar-ratings bar-large">
                    <div className="bar-ratings-top" style={this.starSubRating(1)}></div>
                    <div className="bar-ratings-bottom"></div>
                  </div>
              </div>

          </div>
          <hr/>
          {
            this.props.auth
            ?
            <div>
              <div>
                <h4>Write Your Review</h4>
                <input type="text" name="review" className="medium-form clear-right" placeholder="Enter text here" onChange={this.handleChange} />
              </div>
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
