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
      <div className="l-air__card-grid">
        <div className="l-air__card-item">
          <div className="l-air__card-country">
            <div className="l-air__country-img"
                 style={{backgroundImage: `url(${src.Img}`}}/>
            <div className="l-air__country-title">{src.Name}
              <div className="l-air__country-title-img"/>
            </div>
          </div>
          <div className="l-air__card-meta-grid">
            <div className="l-air__card-meta-item">
              <div className="l-air__card-meta-title">PM 2.5</div>
              <div className="l-air__card-meta-description">Value</div>
            </div>
            <div className="l-air__card-meta-item">
              <div className="l-air__card-meta-title">Ozone</div>
              <div className="l-air__card-meta-description">Value</div>
            </div>
            <div className="l-air__card-meta-item">
              <div className="l-air__card-meta-title">Pollen</div>
              <div className="l-air__card-meta-description">Value</div>
            </div>
          </div>
        </div>
        <div className="l-air__card-item l-air__card-item--last">
          <div className="l-air__card-number">
            <div className="l-air__card-number-title l-air__card-number-title--turquoise">78</div>
            <div className="l-air__card-number-index">Air Quality Index</div>
            <div className="c-button-card c-button-card-ico" />
          </div>
        </div>
      </div>
    );
  }
}

export default Cities;
