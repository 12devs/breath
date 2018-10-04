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
      <div className="box2">
        <div>Name: {src.Name}</div>
        <div className="container">
          <div>
            <div>PM</div>
            <div>{src.PM}</div>
          </div>
          <div>
            <div>Ozone</div>
            <div>{src.Ozone}</div>
          </div>
          <div>
            <div>Pollen</div>
            <div>{src.Pollen}</div>
          </div>
        </div>

        <div>AQI: {src.AQI}</div>
        <div>code: {src.code}</div>
        <br/>
      </div>
    );
  }
}

export default Cities;
