import React, { Component } from 'react';
import services from '../../services';
import Graphic from './Graphic';
import Footer from "../footer";
import logoInside from "./../../assets/img/logo-inside.png";
import figure from "./../../assets/img/figure.svg";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { src } = this.props;
    console.log(src);
    if (!src) {
      return (<h1>{JSON.stringify(this.state.error)}</h1>)
    }
    return (

      <div className={"l-hero__scroll"}>
        <div className="l-hero-charts" style={{ backgroundImage: `url(${src.Img}` }}>
          <a href="/"><img className="l-hero-logo l-hero-logo" src={logoInside} alt=""/></a>
          <nav>
            <button className="l-hero__hamburger hamburger hamburger--slider js-hamburger"><span
              className="hamburger-box"><span className="hamburger-inner"></span></span></button>
            <div className="l-hero__navigation">
              <div className="l-hero__navigation-container"><a className="l-hero__navigation-url" href="">Home</a><a
                className="l-hero__navigation-url" href="">Description</a></div>
            </div>
          </nav>
          <div className="l-hero-charts__city">
            <div className="l-hero-charts__city-subtitle">Air quality in</div>
            <div className="l-hero-charts__city-title">{src.Name}</div>
          </div>
        </div>

        <div className="l-section l-charts">
          <div className="l-container">
            <div className="l-charts__container">
              <div className="l-charts__title">You PM<span className="l-charts__title l-charts__title--mini">2.5</span>
              </div>
              <img src={figure} alt=""/>
            </div>

            <div className="l-charts__container">
              <div className="l-charts__title">You AQI Overtime</div>
              <img src={figure} alt=""/>
            </div>

            <div className="l-charts__container">
              <div className="l-charts__title">Ozone</div>
              <img src={figure} alt=""/>
            </div>
            <div className="l-charts__container">
              <div className="l-charts__title">Relative Humididy</div>
              <img src={figure} alt=""/>
            </div>
            <div className="l-charts__grid">
              <div className="l-charts__item">
                <div className="l-charts__title">Most amount of rain in a day</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"></div>
                  <div className="l-charts__data-number">44.00''</div>
                </div>
              </div>
              <div className="l-charts__item">
                <div className="l-charts__title">Most amount of rain in a day</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"></div>
                  <div className="l-charts__data-number">24.00''</div>
                </div>
              </div>
              <div className="l-charts__item">
                <div className="l-charts__title">Highest Temperature</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"></div>
                  <div className="l-charts__data-number">22 °C''</div>
                </div>
              </div>
              <div className="l-charts__item">
                <div className="l-charts__title">Lowest Temperature</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"></div>
                  <div className="l-charts__data-number">22 °C''</div>
                </div>
              </div>
            </div>
            <div className="l-charts__container">
              <div className="l-charts__title">Pollen Index</div>
              <img src={figure} alt=""/>
            </div>
          </div>
        </div>
        <div className="l-quote"
             style={{ backgroundImage: `url(${src.Img}` }}>
          <div className="l-quote__container">
            <div className="l-quote__text">If you don't like what you see and want to learn more visit us at</div>
            <a className="l-quote__url" href="">hellowynd.com</a>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default City;
