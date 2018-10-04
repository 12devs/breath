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
    let { cities } = this.props;
    if (!cities) {
      cities = [];
    }
    return (
      <div className="cities">
        <h1>Cities</h1>
        { cities.length > 0 ? (cities.map((item, id) =>
            <City key={id} src={item} />
          ))
          :
          <h2>There are no cities</h2>
        }
      </div>
    );
  }
}

export default Cities;
