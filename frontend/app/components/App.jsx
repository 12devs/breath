import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Main from './Main/Main';
import City from './City/City';
import services from "../services";

import wave_bottom from "../assets/img/wave_bottom.svg";
import about from "../assets/img/about.png";
import fb from "../assets/img/fb.png";
import tw from "../assets/img/tw.png";
import inst from "../assets/img/inst.png";

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
          this.setState({ city: null, error: res.error, currentPage: "Main" })
        } else {
          this.setState({ city: res, error: null, currentPage: "City" })
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
    return this.setState({ [key]: value });
  }

  render() {

    const { currentPage } = this.state;

    return (
      <div>
        <input type="button" onClick={() => this.changeState('currentPage', "Main")}
               value={"Main"}/>
        {(() => {
          switch (currentPage) {
            case "Main":
              return (<Main src={this.state} getCity={this.getCity} changeState={this.changeState}/>);
            case "City":
              return (<City src={this.state.city}/>);
            default:
              return (<h1>Unknown Page</h1>);
          }
        })()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
