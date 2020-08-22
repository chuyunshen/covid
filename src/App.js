import React from 'react';
import Graph from './Graph';
import Header from './Header';
import Location from './Location';
import Batch from './Batch';
import Procedure from './Procedure';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';


class ActualDataGraph extends React.Component{
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
    const dateData = this.state.actualData[this.props.values.location]
    let dates = [];
    let dailyActive = [];
    let dailyTest = [];
    for (const date in dateData) {
      dates.push(date);
      // TODO: check what happens if the values are null
      dailyActive.push({ x: this.convertToDate(date), y: dateData[date][0]['dailyActive'] });
      dailyTest.push({ x: this.convertToDate(date), y: dateData[date][0]['dailyTest'] });
    }
    this.setState({ series: [ 
      { name: 'Active Cases', data: dailyActive },
      { name: 'Tested Cases', data: dailyTest }
    ]});
  }

  convertToDate = ( dateString )  => {
    return new Date(dateString.slice(4, 8), dateString.slice(0, 2) - 1, dateString.slice(2, 4));
  }

  componentDidMount() {
    this.fetchData(this.props.values.location);
  }

  render() {
    if (this.state.categories && this.state.series) {
      return (<Graph title={this.props.title} series={ this.state.series } />)
    } else {
      return (<Spinner />)
    }
  }
}

function App() {

    const values = {location: 'alberta'};

    return (
      <div className='App'>
        
        <Header />
        <div className="Panels">
          <div className="LeftPanel">
            <Location />
            <Batch />
            <Procedure />
          </div>
          <div className="RightPanel">
            <ActualDataGraph title={"Actual Data"} values ={ values } />
            <ActualDataGraph title={"Predicted Data"} values ={ values } />
            <ActualDataGraph title={"Predicted Percentage"} values ={ values } />
          </div>
        </div>
      </div>
    );
}

export default App;
