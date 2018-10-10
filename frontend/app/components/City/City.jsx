import React, { Component } from 'react';
import Graphic from './Graphic';
import GraphicTemperature from './GraphicTemperature';
import GraphicHumidity from './GraphicHumidity';
import Footer from "../footer";
import Item from "./Items";
import logoInside from "./../../assets/img/logo-inside.png";
import figure from "./../../assets/img/figure.svg";
import climate01 from "./../../assets/img/climate-01.svg";
import climate02 from "./../../assets/img/climate-02.svg";
import climate03 from "./../../assets/img/climate-03.svg";
import climate04 from "./../../assets/img/climate-04.svg";
import climate05 from "./../../assets/img/climate-05.svg";
import climate06 from "./../../assets/img/climate-06.svg";
import climate07 from "./../../assets/img/climate-07.svg";
import climate08 from "./../../assets/img/climate-08.svg";
import climate09 from "./../../assets/img/climate-09.svg";
import climate10 from "./../../assets/img/climate-10.svg";
import climate11 from "./../../assets/img/climate-11.svg";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const src = this.props.src.city;
    if (!src) {
      return (<h1>{JSON.stringify(this.state.error)}</h1>)
    }
    return (

      <div className={"l-hero__scroll"}>
        <div className="l-hero-charts" style={{ backgroundImage: `url(${src.Img}` }}>
          <a href={"#"}><img className="l-hero-logo l-hero-logo" src={logoInside} alt=""
                             onClick={() => this.props.changeState('currentPage', "Main")}/></a>
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

            <div className="l-charts__grid">
              <Item title="CO volume mixing ratio" img={climate04} value={src.apiWaqiInfo.co} unit={"''"}/>
              <Item title="Ozone layer thickness" img={climate06} value={src.apiWaqiInfo.o3} unit={"''"}/>
              <Item title="PM2.5 particles in air" img={climate07} value={src.apiWaqiInfo.pm25} unit={"''"}/>
              <Item title="PM10 particles in air" img={climate07} value={src.apiWaqiInfo.pm10} unit={"''"}/>
              <Item title="NO2 volume mixing ratio" img={climate04} value={src.apiWaqiInfo.no2} unit={"''"}/>
              <Item title="SO2 volume mixing ratio" img={climate04} value={src.apiWaqiInfo.so2} unit={"''"}/>
              <Item title="Cloudiness" img={climate08} value={src.clouds} unit={"%"}/>
              <Item title="Humidity" img={climate04} value={src.humidity} unit={"%"}/>
              <Item title="Pressure" img={climate04} value={src.pressure} unit={"bar"}/>
              <Item title="Visibility" img={climate10} value={src.visibility} unit={"m"}/>
            </div>

            {/*<div className="l-charts__container">*/}
            {/*<div className="l-charts__title">Your PM<span className="l-charts__title l-charts__title--mini">2.5</span>*/}
            {/*</div>*/}
            {/*<img src={figure} alt=""/>*/}
            {/*</div>*/}

            {/*<div className="l-charts__container">*/}
            {/*<div className="l-charts__title">You AQI Overtime</div>*/}
            {/*<img src={figure} alt=""/>*/}
            {/*</div> */}

            <div className="l-charts__container">
              <div className="l-charts__title">Your Temperature</div>
              <img src={figure} alt=""/>
              <GraphicTemperature src={src.Historical}/>
            </div>

            {/*<div className="l-charts__container">*/}
            {/*<div className="l-charts__title">Ozone</div>*/}
            {/*<img src={figure} alt=""/>*/}
            {/*</div>*/}

            <div className="l-charts__container">
              <div className="l-charts__title">Relative Humididy</div>
              <img src={figure} alt=""/>
              <GraphicHumidity src={src.Historical}/>
            </div>

            <div className="l-charts__grid">
              <Item title="Most amount of rain in a day" img={climate04} value={src.Most_Amount_of_Rain} unit={"%"}/>
              <Item title="Most amount of snow in a day" img={climate03} value={src.Most_Amount_of_Snow} unit={"%"}/>
              <Item title="Highest Temperature" img={climate01} value={src.Highest_Temperature} unit={"°C''"}/>
              <Item title="Lowest Temperature" img={climate02} value={src.Lowest_Temperature} unit={"°C''"}/>
            </div>

            <Graphic src={src.Pollen_index_over_past_year} label={"Pollen Index"} type={'line'}/>

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
