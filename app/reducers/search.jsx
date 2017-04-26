import axios from 'axios'

export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS'

export const setFilteredProducts = filteredProducts => ({
    type: SET_FILTERED_PRODUCTS,
    filteredProducts
})

// const initialState = {
//   filteredProducts: [],
// };

const initialState = []

export const setFilteredProdReducer = (prevState = initialState, action) => {

  let newState = initialState.slice(0)

  switch (action.type) {
  case SET_FILTERED_PRODUCTS:
    newState= [...action.filteredProducts]
    return newState

  default:
    return prevState
  }
}

//--------------------------------------------- THUNKS -------------------------
