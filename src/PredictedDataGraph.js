import React from 'react';
import Graph from './Graph';
import Header from './Header';
import Location from './Location';
import Batch from './Batch';
import Procedure from './Procedure';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import { convertToDate } from './utils';


export default class ActualDataGraph extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      actualData: {}, 
      categories: [],
      series: [],
    }
  }

  fetchData = (location) => {
    const url = 'localhost:5000';
    fetch(`http://${url}/data/${location}`)
    .then(response => response.json())
    .then((response) => { 
      this.setState({actualData: response});
      this.reshapeData();
    })
    .catch((error) => console.log(error))
  }

  reshapeData = () => {
    // date: {dailyActive, dailyTest, entry}
    const dateData = this.state.actualData[this.props.location]
    let dates = [];
    let dailyActive = [];
    let dailyTest = [];
    for (const date in dateData) {
      dates.push(date);
      // TODO: check what happens if the values are null
      dailyActive.push({ x: convertToDate(date), y: dateData[date][0]['dailyActive'] });
      dailyTest.push({ x: convertToDate(date), y: dateData[date][0]['dailyTest'] });
    }
    this.setState({ series: [ 
      { name: 'Active Cases', data: dailyActive },
      { name: 'Tested Cases', data: dailyTest }
    ]});
  }

  componentDidMount() {
    this.fetchData(this.props.location);
  }

  componentDidUpdate() {
    this.fetchData(this.props.location);
  }

  render() {
    if (this.state.categories && this.state.series) {
      return (<Graph title={this.props.title} series={ this.state.series } />)
    } else {
      return (<Spinner />)
    }
  }
}