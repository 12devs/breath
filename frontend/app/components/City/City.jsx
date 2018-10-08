import React, { Component } from 'react';
import services from '../../services';
import Graphic from './Graphic';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {src} = this.props;
    console.log(src);
    if (!src) {
      return (<h1>{JSON.stringify(this.state.error)}</h1>)
    }
    return (
      <div className={"container"}>
        <div className={"box1"}>
          <div className={"box1"}>
            <h1>{src.Name}</h1>
            <img className={"img"} src={src.Img}/>
          </div>
        </div>
        {/*<div>Code: {src.Code}</div>*/}
        <div className={"box1"}>
          <h1>AQI_Today:</h1>
          <h2>{src.AQI_Today}</h2>
        </div>
        <div className={"box1"}>AQI_Historically: {src.AQI_Historically}</div>

        <div className={"box2"}>
          <h1>Highest_PM:</h1>
          <h2>{src.Highest_PM}</h2>
        </div>

        <div className={"box2"}>
          <h1>Lowest_PM:</h1>
          <h2>{src.Lowest_PM}</h2>
        </div>

        <div className={"box1"}>
          <h1>Pollen_index:</h1>
          <h2>{src.Pollen_index}</h2>
        </div>
        <div className={"box2"}>
          <h1>Lowest_Temperature:</h1>
          <h2>{src.Lowest_Temperature}</h2>
        </div>
        <div className={"box2"}>
          <h1>Highest_Temperature:</h1>
          <h2>{src.Highest_Temperature}</h2>
        </div>
        <div className={"box2"}>
          <h1>Most_Amount_of_Rain:</h1>
          <h2>{src.Most_Amount_of_Rain}</h2>
        </div>
        <div className={"box2"}>
          <h1>Most_Amount_of_Snow:</h1>
          <h2>{src.Most_Amount_of_Snow}</h2>
        </div>
        <div className={"box1"}>Humidity_throughtout_past_year: {src.Humidity_throughtout_past_year}</div>
        <div className={"box1"}>
          <h1>Polen_index_over_past_year</h1>
          <Graphic src={src.Pollen_index_over_past_year} label={'Pollen_index'} type={'line'}/>
        </div>
        <div className={"box1"}>
          <h1>Ozone:</h1>
          <h2>{src.Ozone}</h2>
        </div>
        <div className={"box1"}>Current_Weather_Data: {src.Current_Weather_Data}</div>
        <div className={"box1"}>
          <h1>CO2:</h1>
          <h2>{src.CO2}</h2>
        </div>
        <br/>
      </div>
    )
  }
}

export default City;
