import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { addCatTC, removeCatTC } from '../reducers/receive'


class Categories extends React.Component {
  constructor(){
    super()
    this.state={ addCatSwitch: false, newCatName: '', newCatUrl: '' }
    this.handleChangeNameField=this.handleChangeNameField.bind(this)
    this.handleChangeUrlField=this.handleChangeUrlField.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.removeCatBtn=this.removeCatBtn.bind(this)
    this.viewSwitch= this.viewSwitch.bind(this)
  }

  viewSwitch(evt){
    let newBool=!this.state.addCatSwitch
    this.setState({addCatSwitch: newBool})
  }

  handleChangeNameField(evt){
    let newCatName= evt.target.value
    this.setState({ newCatName })
  }

  handleChangeUrlField(evt){
    let newCatUrl= evt.target.value
    this.setState({ newCatUrl })
  }

  handleSubmit(evt){
    this.props.addCat({name: this.state.newCatName, imageUrl: this.state.newCatUrl})//adds cat, and receives all categories with new cat now in it
  }

  removeCatBtn(evt){
    let idofCattoDel=evt.target.value
    this.props.removeCat(idofCattoDel)
  }

  render(){
    const categories = this.props.categories
    let addCatSwitch= this.state.addCatSwitch
    return (
      <div>
{/*
<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner" role="listbox">
    <div className="carousel-item active">
      <img className="d-block img-fluid" src="https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block img-fluid" src="https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block img-fluid" src="https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg" alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div> */}






        <h3>Categories</h3>
        { this.props.auth && this.props.auth.isAdmin ? <button type="submit" className="btn btn-primary" onClick={ this.viewSwitch }> Toggle Add Category </button> : null }
        { addCatSwitch ?
          (
            <div><input type="text" name="cat-name" className="medium-form" placeholder="Enter new category name here" onChange={this.handleChangeNameField} />
                 <input type="text" name="cat-url" className="medium-form" placeholder="Enter image URL here" onChange={this.handleChangeUrlField} />
                 <button type="submit" className="btn btn-primary" onClick={ this.handleSubmit }> Submit </button>
            </div>
          )
          : null }

        <div className="row">
          {
            categories && categories.map(category => (
              <div className="col-xs-4 category" key={ category.id } >
                { this.props.auth && this.props.auth.isAdmin ? <button type="submit" className="btn btn-danger" value={category.id} onClick={ this.removeCatBtn }> Remove </button> : null }
                <Link className="thumbnail" to={`/categories/${category.id}`} >
                <div className="resizeLrg">
                  <img src={ category.imageUrl } />
                </div>
                <div className="caption">
                  <h5>
                    <span>{ category.name }</span>
                  </h5>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
  }
}

const mapState = ({ categories, auth }) => ({ categories, auth })// store.getState().categories !!  ... that is passed into categories

const mapDispatch = (dispatch)=> ({
  addCat: function(catObj){
    dispatch(addCatTC(catObj))
  },
  removeCat: function(id){
    dispatch(removeCatTC(id))
  }
})

export default connect(mapState, mapDispatch)(Categories);
