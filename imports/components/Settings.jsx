import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
    this.parse = this.parse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getMeteorData() {
    return {
      isAuthenticated: Meteor.userId() !== null,
      results: [],
      query: '',
    }
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

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.search();
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

  handleChange(event) {
    this.setState({
      query: event.target.value,
    })
  }

  search(e) {
    this.setState({
      results: [],
    });
    Meteor.call('searchDocumentations', this.state.query, (error, results) => {
      if (!error) {
        this.setState({
          results,
        });
      }
    });
  }

  parse() {
    Meteor.call('parseRepository', function (error) {

    });
  }

  renderResult(result) {
    return (
      <div key={result.url} className="border-top p-3 mb-3">
        <a className="search-result" href={result.url}>{result.url}</a>
      </div>
    )
  }

  render() {
    return (
      <div className="search">
        <nav className="nav">
          <div className="nav-content">
            <div className="nav-part-left">
              <img src="/raven.png" className="nav-logo" />
            </div>
            <div className="nav-part-center" />
            <div className="nav-part-right">
              <div className="nav-avatar">
                <img src="/robot.png" className="nav-avatar-img" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
