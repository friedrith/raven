import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.getMeteorData()
    this.logout = this.logout.bind(this)
  }

  getMeteorData() {
    return { isAuthenticated: Meteor.userId() !== null }
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      // browserHistory.push('/login')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isAuthenticated) {
      // browserHistory.push('/login')
    }
  }

  logout(e){
    e.preventDefault()
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason )
        } else {
            // browserHistory.push('/login')
        }
    })
  }

  gotoMinutes(e){
    e.preventDefault()
    // browserHistory.push('/')
  }

  gotoDashboard(e){
    e.preventDefault()
    // browserHistory.push('/dashboard')
  }


  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
