import React from 'react';
import Graph from './Graph';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import { convertToDate } from './utils';
import { BASE_URL } from './config';


export default class PredictedDataGraph extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      actualData: null,
      categories: [],
      series: [],
      predictedData: null,
      predictedPercentage: null,
      presentDay: null
    }
  }

  fetchActualData = (location) => {
    fetch(`http://${BASE_URL}/prediction/${location}/14`)
    .then(response => response.json())
    .then((response) => { 
      this.setState({actualData: response});
    })
    .catch((error) => console.log(error))
  }

  fetchPredictedData = (location) => {
    // TODO: change to prediction
    fetch(`http://${BASE_URL}/prediction/${location}/0`)
    .then(response => response.json())
    .then((response) => { 
      this.setState({predictedData: response});
    })
    .catch((error) => console.log(error))
  }

  reshapeData = () => {
    const actual = this.state.actualData[this.props.location];
    const predicted = this.state.predictedData[this.props.location];
    const dateData = {...actual, ...predicted};
    console.log(actual);
    console.log(predicted);
    console.log(dateData);
    let dates = [];
    let dailyActive = [];
    let dailyTest = [];
    let percentage = [];
    for (const date in dateData) {
      dates.push(date);
      dailyActive.push({ x: convertToDate(date), y: dateData[date][0]['dailyActive'] });
      dailyTest.push({ x: convertToDate(date), y: dateData[date][0]['dailyTest'] });
      percentage.push({ x: convertToDate(date), y: dateData[date][0]['dailyActive'] / dateData[date][0]['dailyTest'] });
    }
    console.log(dailyActive);
    console.log(dailyTest);
    this.setState({ series: [ 
      { name: 'Active Cases', data: dailyActive },
      { name: 'Tested Cases', data: dailyTest }
    ]});
    this.setState({ predictedPercentage: [
      { name: 'Percentage', data: percentage}
    ] })
  }

  componentDidMount() {
    this.fetchActualData(this.props.location);
    this.fetchPredictedData(this.props.location);
    if (this.state.actualData && this.state.predictedData) {
      this.reshapeData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.fetchActualData(this.props.location);
      this.fetchPredictedData(this.props.location);
    }
    if (prevState.predictedData !== this.state.predictedData && this.state.actualData && this.state.predictedData) {
      this.reshapeData();
    }
  }

  render() {
    if (this.state.series && this.state.predictedPercentage) {
      //const today = Object.keys(this.state.series['Active Cases'])['x'].getTime();
      const today = new Date().getTime();
      return (
      <div> 
        <Graph presentDay={today} type={"scatter"} title={this.props.title} series={ this.state.series } />
        <Graph presentDay={today} type={"scatter"} title={'Predicted Percentage in ' + this.props.location} series={ this.state.predictedPercentage } />
      </div>
      )
    } else {
      return (<Spinner />)
    }
  }
}