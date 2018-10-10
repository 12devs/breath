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
    let color;
    const colors = [
      "l-air__card-number-title--turquoise",
      "l-air__card-number-title--scarlet",
      "l-air__card-number-title--blue",
      "l-air__card-number-title--orange",
      "l-air__card-number-title--purple",
    ];

    const values = [50, 100, 150, 200, 1000];

    for (let i = 0; i < values.length; i++) {
      if (src.AQI_Today < values[i]) {
        color = colors[i];
        break
      }
    }

    return (
      <div className="l-air__card-grid">
        <div className="l-air__card-item">
          <div className="l-air__card-country">
            <div className="l-air__country-img"
                 style={{ backgroundImage: `url(${src.Img}` }}/>
            <div className="l-air__country-title">{src.Name} ({src.Code})
              <div className="l-air__country-title-img"/>
            </div>
          </div>
          <div className="l-air__card-meta-grid">
            <div className="l-air__card-meta-item">
              <div className="l-air__card-meta-title">PM 2.5</div>
              <div className="l-air__card-meta-description">{src.pm25}</div>
            </div>
            <div className="l-air__card-meta-item">
              <div className="l-air__card-meta-title">Ozone</div>
              <div className="l-air__card-meta-description">{src.Ozone}</div>
            </div>
            <div className="l-air__card-meta-item">
              <div className="l-air__card-meta-title">Pollen</div>
              <div className="l-air__card-meta-description">{src.Pollen_index}</div>
            </div>
          </div>
        </div>
        <div className="l-air__card-item l-air__card-item--last">
          <div className="l-air__card-number">
            <div className={"l-air__card-number-title " + color}>{src.AQI_Today}</div>
            <div className="l-air__card-number-index">Air Quality Index</div>
            <div className="c-button-card c-button-card-ico"
                 onClick={() => {
                   return this.props.changeState('currentPage', 'Preloader')
                     .then(() => {
                       this.props.changeState('code', src.Code)
                     })
                     .then(() => {
                       this.props.getCity();
                     })
                 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Cities;
