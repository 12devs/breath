import React, { Component } from 'react';
import City from './City';

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  // componentDidMount() {
  //
  // }

  render() {
    let { src } = this.props;
    return (
      <div className="cities">
        <div>Name: {src.Name}</div>
        <div>PM: {src.PM}</div>
        <div>Ozone: {src.Ozone}</div>
        <div>Pollen: {src.Pollen}</div>
        <div>AQI: {src.AQI}</div>
        <div>code: {src.code}</div>
        <br/>
      </div>
    );
  }
}

export default Cities;
