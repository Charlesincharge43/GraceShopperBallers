// import { RECEIVE_CATEGORIES, RECEIVE_PRODUCTS, RECEIVE_USERS } from '../constants';   //No longer necessary... change constants asdlfkjadspf

import axios from 'axios'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER'


//-------------------------------- CATEGORIES ACTION CREATOR AND REDUCER


export const receiveCategoriesAC = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})

const initialCatState = [];

export const recCatReducer = (newState = initialCatState, action) => {
  switch (action.type) {
  case RECEIVE_CATEGORIES:
    return action.categories.slice(0);
  }
  return newState
}

//-------------------------------- CATEGORIES THUNKS ----------------

export const receiveCatsTC= () =>{//gets all categories
  return function funk(dispatch){
    return axios.get('/api/categories/')
      .then(res=>res.data)
      .then((categories)=>{
        dispatch(receiveCategoriesAC(categories))
      })
      .catch(err=>err)
  }
}

export const addCatTC= (catObj)=> {//make new category, then calls receiveCats() to get all categories again
  return function thunk(dispatch){
    return axios.post('/api/categories/', catObj)
      .then(()=>{
        dispatch(receiveCatsTC())
      })
      .catch(err=>err)
  }
}

export const removeCatTC= (id) => {//remove category by id, then call receiveCats() to get all categories again
  return function funk(dispatch){
    return axios.delete(`/api/categories/${id}`)
      .then(()=>{
        dispatch(receiveCatsTC())
      })
      .catch(err=>err)
  }
}


//-------------------------------- PRODUCTS ACTION CREATOR AND REDUCER

export const receiveProductsAC = products => ({
    type: RECEIVE_PRODUCTS,
    products
})

const initialProdState = [];

export const recProdReducer = (newState = initialCatState, action) => {
  switch (action.type) {
  case RECEIVE_PRODUCTS:
    return action.products.slice(0);
  }
  return newState
}

export const receiveProdsTC= () =>{//gets all products (remember filter is happening on the front end on the products component.. so no need to implement any logic here)
  return function funk(dispatch){
    return axios.get('/api/products/')
      .then(res=>res.data)
      .then((products)=>{
        dispatch(receiveProductsAC(products))
      })
      .catch(err=>err)
  }
}

export const addProdTC= (prodObj)=> {//make new category, then calls receiveCats() to get all categories again
  return function thunk(dispatch){
    return axios.post('/api/products/', prodObj)
      .then(()=>{
        dispatch(receiveProdsTC())
      })
      .catch(err=>err)
  }
}

export const removeProdTC= (id) => {//remove category by id, then call receiveCats() to get all categories again
  return function funk(dispatch){
    return axios.delete(`/api/products/${id}`)
      .then(()=>{
        dispatch(receiveProdsTC())
      })
      .catch(err=>err)
  }
}
