import React, { Component } from 'react';
import Chart from 'chart.js';

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
    const Data = src.map(elem => elem.temp);
    const data = {
      labels,
      datasets: [{
        label: "Temperature",
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
    const ctx = document.getElementById("myChartTemp").getContext('2d');
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
    return (
      <div>
        <canvas id="myChartTemp"></canvas>
      </div>
    );
  }
}
