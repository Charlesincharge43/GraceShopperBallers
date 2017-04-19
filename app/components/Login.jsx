import React from 'react'
import store from '../store'
import { browserHistory } from 'react-router'

import { loginUserThunk } from '../reducers/users'

export class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const thunk = loginUserThunk(this.state.email, this.state.password)
    store.dispatch(thunk)
    browserHistory.push(`/categories`)
  }

  render() {

    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input type="text" name="email" value={this.state.email} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="text" name="password" value={this.state.password} className="form-control" placeholder="" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>

        </form>

        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/login/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Login! with Google</span>
            </a>
          </p>
        </div>
      </div>
    )
  }
}

import {connect} from 'react-redux'

function mapState(state, ownProps) {
  return {}
}

function mapDispatch(dispatch, ownProps) {
  return {}
}

const LoginContainer = connect(mapState, mapDispatch)(Login)

export default LoginContainer
