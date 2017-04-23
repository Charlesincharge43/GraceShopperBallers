import axios from 'axios'
import {emptySessionPoO} from './orders'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {email, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(()=> dispatch(emptySessionPoO()))
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        return dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export function createUserThunk (firstName, lastName, email, password) {

  return function thunk (dispatch) {

    return axios.post('/api/users', {firstName: firstName, lastName: lastName, email: email, password: password})
    .then(res => res.data)
    .then(user => {
      const action = login(user.email, user.password);
      dispatch(action);
    })
    .catch(err => {
      console.error(err);
    });
  };
}

export default reducer
