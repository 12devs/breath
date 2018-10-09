import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Main from './Main/Main';
import City from './City/City';
import services from "../services";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getUserSettings: () => dispatch(getUserSettings()),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "KulDmitri@gmail.com",
      code: "36310",
      cities: [],
      city: [],
      currentPage: 'Main',
      error: ""
    };
    this.getCities = this.getCities.bind(this);
    this.getCity = this.getCity.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    return this.getCities()
  }

  getCity() {
    return services.getCityPageData(this.state.code, this.state.email)
      .then(res => {
        if (res.error) {
          return this.setState({ city: null, error: res.error, currentPage: "Main" })
        } else {
          return this.setState({ city: res, error: null, currentPage: "City" })
        }
      })
  }

  getCities() {
    return services.getMainPageData()
      .then(data => {
        this.setState({ cities: data, currentPage: "Main" })
      })
  }

  changeState(key, value) {
    return new Promise((resolve) => {
      this.setState({ [key]: value }, () => {
        resolve(true)
      })
    })
  }

  render() {

    const { currentPage } = this.state;

    return (
      <div>
        {(() => {
          switch (currentPage) {
            case "Main":
              return (<Main src={this.state} getCity={this.getCity} changeState={this.changeState}/>);
            case "City":
              return (<City src={this.state.city} changeState={this.changeState}/>);
            default:
              return (<h1>Unknown Page</h1>);
          }
        })()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
