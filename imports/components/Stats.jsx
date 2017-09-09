import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = this.getMeteorData()
    this.logout = this.logout.bind(this)
  }

  getMeteorData() {
    return {
      repositories: [],
      isAuthenticated: Meteor.userId() !== null,
    };
  }

  componentWillMount() {
    Meteor.call('listRepositories', {}, (err, repositories) => {
      if (!err) {
        console.log('listRepositories', repositories)
        this.setState({
          repositories: repositories,
        });
      }

    });


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

  renderResult(repository) {
    return (
      <div key={repository.full_name} className="border-bottom p-3 mb-3">
        <h3>{repository.full_name}</h3>

      </div>
    )
  }

  render() {
    return (
      <div className="search">
        <h1>Raven</h1>
        {this.props.match.params. pseudo}

        {this.state.repositories.map(repository => (
              this.renderResult(repository)
            ))}
        {/* <div className="blankslate">
          <h3>This is a blank slate</h3>
          <p>Use it to provide information when no dynamic content exists.</p>
        </div> */}
      </div>
    )
  }
}
