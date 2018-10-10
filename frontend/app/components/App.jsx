import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Main from './Main/Main';
import City from './City/City';
import Preloader from './Preloader';
import services from "../services";

const COMPONENT = {
  'City': City,
  'Main': Main,
  'Preloader': Preloader,
};

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
      currentPage: 'Preloader',
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
    this.changeState('currentPage', "Preloader")
      .then(() => {
        return services.getCityPageData(this.state.code, this.state.email);
      })
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
    const MyComponent = COMPONENT[this.state.currentPage];

    return (
      <div>
        <MyComponent src={this.state} getCity={this.getCity} changeState={this.changeState}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
