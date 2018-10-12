import React, { Component } from 'react';
import figure from './../../assets/img/figure.svg';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

export default class Radar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newChart = this.newChart.bind(this);
  }

  componentDidMount() {
    if (this.props.src) {
      this.newChart(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (this.props !== prevProps) {
      this.newChart(this.props);
    }
  }

  newChart(props) {
    let {src, label, type} = props;
    let data = [];
    let count = 0;
    let mm = [];
    for (var i = 0; i < 16; i++) {
      mm[i] = 0;
    }

    const categories = ['North', 'NNE', 'NE', 'ENE', 'East', 'ESE', 'SE', 'SSE', 'South', 'SSW', 'SW', 'WSW', 'West', 'WNW', 'NW', 'NNW'];

    for (let key in src.history) {
      data[count] = [key, src.history[key]];
      count++;
    }

    let arr = Object.values(src.history);
    let max = Math.max(...arr);

    mm[categories.indexOf(src.current.dir)] = [src.current.dir, max];

    new Highcharts.Chart({
      chart: {
        renderTo: 'container',
        polar: true
      },
      title: {
        text: null
      },
      tooltip: {
        enabled: false,
        formatter: function () {
          return `${this.y}% for the last year`;
        }
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        size: '95%'
      },
      xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
          formatter: function () {
            return categories[this.value / 22.5];
          }
        }
      },
      yAxis: {
        min: 0,
        max: max - 1,
        labels: {
          formatter: function () {
            return this.value + '%';
          }
        }
      },
      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 22.5,
          pointPlacement: 'on'
        },
      },
      series: [{
        name: 'Last Year',
        data,
        type: 'column',
        color: '#4BC7C9',
      }, {
        name: 'current',
        data: mm,
        type: 'area',
        color: 'blue',
      }]
    });
  }


  render() {
    return (
      <div className="l-charts__container">
        <div className="l-charts__title">Wind Rose</div>
        <img src={figure} alt=""/>
        <div>
          <div id="container"/>
        </div>
      </div>
    );
  }
}
