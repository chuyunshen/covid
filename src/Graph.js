import React from 'react';
import Chart from 'react-apexcharts'
import './Graph.css';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
        },
        annotations: {
          xaxis: [{
            x: new Date(this.props.presentDay).getTime(),
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Present Day',
            }
          }]
        },
        title: {
          text: this.props.title ,
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '20px',
            fontWeight:  'bold',
            fontFamily:  'Baloo Tamma 2', 
            color:  '#263238'
    },
        },
        colors: ['#322A7C', '#F44336', '#9C27B0'],
        xaxis: {
          type: 'datetime',
        }
      }
    }
  }
  render() {
    return (
      <Chart className="Chart" options={this.state.options} series={this.props.series} type={this.props.type} width={700} height={350} />
    )
  }
}