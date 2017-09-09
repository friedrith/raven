import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from 'react-bootstrap'

// import { browserHistory } from 'react-router'

export default class Nav extends Component {
  constructor(props) {
    super(props)
  }

  getMeteorData() {
    return {
      isAuthenticated: Meteor.userId() !== null,
      results: [],
      query: '',
    }
  }

  gotoMinutes(e){
    e.preventDefault()
    // browserHistory.push('/')
  }

  gotoDashboard(e){
    e.preventDefault()
    // browserHistory.push('/dashboard')
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
    })
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-part-left">
            <img src="/img/raven.png" className="nav-logo" />
          </div>
          <div className="nav-part-center">
            {this.props.children}
          </div>
          <div className="nav-part-right">
          <div className="nav-avatar">

          <Dropdown id="dropdown-custom-1" pullRight>

          <Dropdown.Toggle className="nav-avatar-button">
            <img src="/img/robot.png" className="nav-avatar-img" />

          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>Active Item</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
