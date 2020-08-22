import React from 'react';
import Graph from './Graph';
import Header from './Header';
import Location from './Location';
import Batch from './Batch';
import Procedure from './Procedure';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import { convertToDate } from './utils';
import ActualDataGraph from './ActualDataGraph';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualData: {}, 
      categories: [],
      series: [],
      selectedRegion: 'Alberta',
    }
  }

  getSelectedRegion = (region) => {
    this.setState({ selectedRegion: region});
  }

  render() {
    return (
      <div className='App'>
        
        <Header />
        <div className="Panels">
          <div className="LeftPanel">
            <Location sendData={this.getSelectedRegion}/>
            <Batch />
            <Procedure />
          </div>
          <div className="RightPanel">
            <div>{this.state.selectedRegion}</div>
            <ActualDataGraph title={"Actual Data in " + this.state.selectedRegion} location={ this.state.selectedRegion } />
            <ActualDataGraph title={"Predicted Data in " + this.state.selectedRegion} location={ this.state.selectedRegion } />
            <ActualDataGraph title={"Predicted Percentage in " + this.state.selectedRegion} location={ this.state.selectedRegion } />
          </div>
        </div>
      </div>
  );
  }
}