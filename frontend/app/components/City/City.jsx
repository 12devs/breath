import React, { Component } from 'react';
import services from '../../services';
import Graphic from './Graphic';
import GraphicTemperature from './GraphicTemperature';
import GraphicHumidity from './GraphicHumidity';
import Footer from "../footer";
import logoInside from "./../../assets/img/logo-inside.png";
import figure from "./../../assets/img/figure.svg";
import climate01 from "./../../assets/img/climate-01.svg";
import climate02 from "./../../assets/img/climate-02.svg";
import climate03 from "./../../assets/img/climate-03.svg";
import climate04 from "./../../assets/img/climate-04.svg";

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

            {/*<div className="l-charts__container">*/}
              {/*<div className="l-charts__title">You AQI Overtime</div>*/}
              {/*<img src={figure} alt=""/>*/}
            {/*</div> */}

            <div className="l-charts__container">
              <div className="l-charts__title">You Temperature</div>
              <img src={figure} alt=""/>
              <GraphicTemperature src={src.result}/>
            </div>

            <div className="l-charts__container">
              <div className="l-charts__title">Ozone</div>
              <img src={figure} alt=""/>
            </div>
            <div className="l-charts__container">
              <div className="l-charts__title">Relative Humididy</div>
              <img src={figure} alt=""/>
              <GraphicHumidity src={src.result}/>
            </div>
            <div className="l-charts__grid">
              <div className="l-charts__item">
                <div className="l-charts__title">Most amount of rain in a day</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"><img src={climate04} alt=""/></div>
                  <div className="l-charts__data-number">{src.Most_Amount_of_Rain}%</div>
                </div>
              </div>
              <div className="l-charts__item">
                <div className="l-charts__title">Most amount of snow in a day</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"><img src={climate03} alt=""/></div>
                  <div className="l-charts__data-number">{src.Most_Amount_of_Snow}%</div>
                </div>
              </div>
              <div className="l-charts__item">
                <div className="l-charts__title">Highest Temperature</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"><img src={climate01} alt=""/></div>
                  <div className="l-charts__data-number">{src.Highest_Temperature}°C''</div>
                </div>
              </div>
              <div className="l-charts__item">
                <div className="l-charts__title">Lowest Temperature</div>
                <img src={figure} alt=""/>
                <div className="l-charts__data">
                  <div className="l-charts__data-ico"><img src={climate02} alt=""/></div>
                  <div className="l-charts__data-number">{src.Lowest_Temperature}°C''</div>
                </div>
              </div>
            </div>
            <div className="l-charts__container">
              <div className="l-charts__title">Pollen Index</div>
              <img src={figure} alt=""/>
              <Graphic src={src.Pollen_index_over_past_year} label={"Pollen Index"} type={'line'}/>
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
