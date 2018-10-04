import React, { Component } from 'react';
import services from '../../services';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: {},
    };
    this.getCityPageData = this.getCityPageData.bind(this);

  }

  componentDidMount() {
    return this.getCityPageData()
  }

  getCityPageData() {
    return services.getCityPageData(this.props.match.params.code)
      .then(res => {
        this.setState({city:res})
      })
  }

  render() {
    const src = this.state.city;
    return (
      <div className={"container"}> City
        {/*<div>Code: {src.Code}</div>*/}
        <div className={"box1"}>AQI_Today: {src.AQI_Today}</div>
        <div>AQI_Historically: {src.AQI_Historically}</div>
        <div>Highest_PM: {src.Highest_PM}</div>
        <div>Lowest_PM: {src.Lowest_PM}</div>
        <div>Pollen_Index: {src.Pollen_Index}</div>
        <div>Lowest_Temperature: {src.Lowest_Temperature}</div>
        <div>Highest_Temperature: {src.Highest_Temperature}</div>
        <div>Most_Amount_of_Rain: {src.Most_Amount_of_Rain}</div>
        <div>Polen_index_over_past_year: {src.Polen_index_over_past_year}</div>
        <div>Humidity_throughtout_past_year: {src.Humidity_throughtout_past_year}</div>
        <div>Ozone: {src.Ozone}</div>
        <div>Current_Weather_Data: {src.Current_Weather_Data}</div>
        <div>CO2: {src.CO2}</div>
        <br/>
      </div>
    )
  }
}

export default City;
