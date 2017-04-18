import React from 'react'
import store from '../store'

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    store.dispatch(login(evt.target.username.value, evt.target.password.value))
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

function mapState(state, ownProps) {
  return {}
}

function mapDispatch(dispatch, ownProps) {
  return {
    login: login
  }
}

const LoginContainer = connect(mapState, mapDispatch)(Login)

export default LoginContainer
