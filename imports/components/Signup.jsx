import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = this.getMeteorData()
    this.logout = this.logout.bind(this)
    this.signup = this.signup.bind(this)
  }

  getMeteorData() {
    return { isAuthenticated: Meteor.userId() !== null }
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

  signup () {
    Meteor.loginWithGithub({
      requestPermissions: ['']
    }, (err) => {
      if (err) {
        // handle error
      } else {
        // successful login!
      }
    });
  }


  render() {
    return (
      <div className="signup">
        <div className="welcome">
          <div className="welcome-center">
            <h1 className="welcome-title">RAVEN</h1>
            <button className="btn btn-primary" type="button" onClick={this.signup}>Connect with github</button>
          </div>
        </div>
      </div>
    )
  }
}
