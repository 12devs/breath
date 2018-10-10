import React, { Component } from 'react';
import Chart from 'chart.js';
import figure from "./../../assets/img/figure.svg";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newChart = this.newChart.bind(this);
  }

  componentDidMount() {
    if (this.props.src) {
      this.newChart(this.props)
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (this.props !== prevProps) {
      this.newChart(this.props);
    }
  }

  newChart(props) {
    let { src} = props;
    const labels = src.map(elem => elem.date);
    const Data = src.map(elem => elem.humidity);
    const data = {
      labels,
      datasets: [{
        label: "Humidity",
        data: Data,
        backgroundColor: [
          '#80bec1',
        ],
        borderColor: [
          '#69a6a7',
        ],
        borderWidth: 1
      }]
    }
    const ctx = document.getElementById("myChartHumidity").getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  render() {
    if (!this.props.src){
      return null
    }
    return (
      <div className="l-charts__container">
        <div className="l-charts__title">Relative Humididy</div>
        <img src={figure} alt=""/>
        <canvas id="myChartHumidity"></canvas>
      </div>
    );
  }
}
