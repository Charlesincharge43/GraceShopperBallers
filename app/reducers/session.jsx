export const FETCH_SESSION = 'FETCH_SESSION'

//-------------------------------- FETCH_SESSION ACTION CREATOR AND REDUCER


export const fetchSessionAC = sessionObj => ({
    type: FETCH_SESSION,
    session: sessionObj,
})

let initialState = {};

export const setSessionReducer = (prevState = initialState, action) => {

  let newState = Object.assign({}, prevState)

  switch (action.type) {

    case FETCH_SESSION:
      newState = action.session;
      return newState;

    default:
      return prevState;
  }
}
