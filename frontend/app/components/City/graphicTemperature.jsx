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
    let { src, label, type } = props;
    src = src.filter(elem => elem.Index);
    src = src.map(elem => {
      elem.Period = elem.Period.split('T')[0];
      return elem;
    });
    const labels = src.map(elem => elem.Period);
    const Data = src.map(elem => elem.Index);
    const data = {
      labels,
      datasets: [{
        label,
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
    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
      type,
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
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    );
  }
}
