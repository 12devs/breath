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
        <div className="container">
          <div className="box2"><h1>{src.Name} </h1></div>
          <div className={"right index box2"}><h1>{src.AQI} </h1></div>
        </div>
        <div className="container">
          <div className="box4">
            <div>PM</div>
            <div>{src.PM}</div>
          </div>
          <div className="box4">
            <div>Ozone</div>
            <div>{src.Ozone}</div>
          </div>
          <div className="box4">
            <div>Pollen</div>
            <div>{src.Pollen}</div>
          </div>
          <div className="box4">
            <div>AQI</div>
          </div>
        </div>

        <div className="right arrow" ><a className="arrow" href={`city/${src.code}`}></a></div>
        <br/>
      </div>
    );
  }
}

export default Cities;
