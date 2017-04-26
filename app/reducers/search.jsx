import axios from 'axios'

export const SET_PRODUCT_SEARCH_ARR = 'SET_PRODUCT_SEARCH_ARR'

export const setProductSearchArr = productSearchArr => ({
    type: SET_PRODUCT_SEARCH_ARR,
    productSearchArr
})

const initialState = {
  productSearchArr: [],
};

export const searchReducer = (prevState = initialState, action) => {

  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_PRODUCT_SEARCH_ARR:
    newState.productSearchArr = [...action.productSearchArr]
    return newState

  default:
    return prevState
  }
}

//--------------------------------------------- THUNKS -------------------------


