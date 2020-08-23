import React from 'react';
import Graph from './Graph';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import { convertToDate } from './utils';
import {BASE_URL} from './config.js';


export default class PredictedDataGraph extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      actualData: {}, 
      categories: [],
      series: [],
    }
  }

  fetchData = (location) => {
    fetch(`http://${BASE_URL}/data/${location}`)
    .then(response => response.json())
    .then((response) => { 
      this.setState({actualData: response});
      this.reshapeData();
    })
    .catch((error) => console.log(error))
  }

  reshapeData = () => {
    const dateData = this.state.actualData[this.props.location]
    let dates = [];
    let dailyActive = [];
    let dailyTest = [];
    for (const date in dateData) {
      dates.push(date);
      dailyActive.push({ x: convertToDate(date), y: dateData[date][0]['dailyActive'] });
      dailyTest.push({ x: convertToDate(date), y: dateData[date][0]['dailyTest'] });
    }
    convertToDate("06302020");
    this.setState({ series: [ 
      { name: 'Active Cases', data: dailyActive },
      { name: 'Tested Cases', data: dailyTest }
    ]});
  }

  componentDidMount() {
    this.fetchData(this.props.location);
  }

  componentDidUpdate(prevProps, preState) {
    if (prevProps.location !== this.props.location) {
      this.fetchData(this.props.location);
    }
  }

  render() {
    if (this.state.categories && this.state.series) {
      return (<Graph type="line" title={this.props.title} series={ this.state.series } />)
    } else {
      return (<Spinner />)
    }
  }
}