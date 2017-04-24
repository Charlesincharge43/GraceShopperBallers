export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
import axios from 'axios'

export const receiveReviewsAC = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
})

const initialReviewState = [];

export const reviewsReducer = (newState = initialReviewState, action) => {
  switch (action.type) {
  case RECEIVE_REVIEWS:
    return action.reviews.slice(0);
  }
  return newState
}

//--------------------------------------------- THUNKS -------------------------

export const receiveReviewsTC= ({user_id, product_id})=> {
  return function thunk(dispatch){
    if(!user_id) user_id=''
    if(!product_id) product_id=''
    return axios.get(`/api/reviews/?user_id=${user_id}&product_id=${product_id}`)
      .then(res=>{
        let reviewsArr= res.data
        dispatch(receiveReviewsAC(reviewsArr))
      })
      .catch(err=>err)
  }
}

export const postReviewthenReceiveAllTC= (newReviewObj)=> {
  return function thunk(dispatch){
    console.log('inside thunk')
    return axios.post('/api/reviews/',newReviewObj)
      .then(res=>{
        let reviewsArr= res.data
        dispatch(receiveReviewsAC(reviewsArr))
      })
      .catch(err=>err)
  }
}
