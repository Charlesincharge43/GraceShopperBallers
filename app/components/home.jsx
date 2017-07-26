import React from 'react'
import { Products } from './Products'
import { connect } from 'react-redux'
import { Link } from 'react-router'

function sortByRating (products){
  let sortedByRating= products.sort(function(a,b){
    let aRating=a.starNum/a.starDenom
    let bRating=b.starNum/b.starDenom
    return bRating-aRating
  })
  return [sortedByRating[0],sortedByRating[1]]
}

const Home = props =>{
  let filteredProducts= props.products.length ? sortByRating(props.products) : []
  console.log(" HOME PROPS IS ",props)
  return (
    <div>
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <div className="resizeXL">
            <img className="first-slide" src="https://images4.alphacoders.com/219/219054.jpg" alt="First slide"/>
          </div>
          <div className="container">
            <div className="carousel-caption">
              <div>
                <h1> What's Hot Right Now</h1>
                <p> Check out our highest rated products </p>
                <p><a className="btn btn-lg btn-primary" href="#" role="button">Top Products</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="resizeXL">
            <img className="second-slide" src="https://images2.alphacoders.com/882/thumb-1920-88252.jpg" alt="Second slide" />
          </div>
          <div className="container">
            <div className="carousel-caption">
              <h1> Sign Up Now</h1>
              <p> Free shipping for your next purchase if you sign up today  </p>
              <p><a className="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>

            </div>
          </div>
        </div>
        <div className="item">
          <div className="resizeXL">
            <img className="third-slide" src="http://wallpaper.pickywallpapers.com/1366x768/just-a-basket.jpg" alt="Third slide" />
          </div>
          <div className="container">
            <div className="carousel-caption">
              <h1> Playoff Tickets</h1>
              <p> Get the best seats yada yada yada 20% off </p>
              <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
            </div>
          </div>
        </div>
      </div>
      <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>


    </div>
    { filteredProducts.length && <Products auth={ props.auth } products={ props.products } orders={ props.orders } filteredProducts= { filteredProducts }  /> }
  </div>)
  }


const mapState = ({ auth, products, orders }) => ({ auth, products, orders })

const mapDispatch = (dispatch)=>({})

export default connect(mapState, mapDispatch)(Home)
