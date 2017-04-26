import React from 'react'
import Products from './Products'
import { Link } from 'react-router'

const Home = props =>{

  return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <div className="resizeXL">
            <img className="first-slide" src="http://img02.yeeea.com/download/26-1/lebron_james_5-wallpaper-1280x800.jpg" alt="First slide"/>
          </div>
{/*
  This whole thing looks like google ads... what a shame.. in theory coulda been awesome to show

          <div className="col-xs-4 carousel-floater large-div" key="1">


            <Link className="thumbnail inline side-margins" to={`/products/1`} >
                <div className="resizeSm">
                  <img src= "https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg" />
                </div>
                <div className="caption">
                  <h5>
                    <p>Title Placeholder</p>
                    <p>Description Placeholder</p>
                    <p>Price: $2.99</p>
                  </h5>
                  <div>
                    <div className="star-ratings-css stars-large">
                      <div className="star-ratings-css-top" style={{width: '80%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                      <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span className='text-small'>(15)</span></div>
                    </div>
                  </div>
                </div>
          </Link>



          <Link className="thumbnail inline side-margins" to={`/products/1`} >
              <div className="resizeSm">
                <img src= "https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg" />
              </div>
              <div className="caption">
                <h5>
                  <p>Title Placeholder</p>
                  <p>Description Placeholder</p>
                  <p>Price: $2.99</p>
                </h5>
                <div>
                  <div className="star-ratings-css stars-large">
                    <div className="star-ratings-css-top" style={{width: '80%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                    <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span className='text-small'>(15)</span></div>
                  </div>
                </div>
              </div>
        </Link>

        </div> */}

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
    {/* <Products />  need to pass in props to this? */}
    </div>)
  }

export default Home
