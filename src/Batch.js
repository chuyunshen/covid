import React from 'react';
import { convertToDate} from './utils'
import './Batch.css';
import { BASE_URL } from './config';

class Size extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: null
    }
  }

  render() {
    const date = convertToDate("0" + this.props.date);
    const month = date.toLocaleString('default', { month: 'long' });
    return (
    <div className='Size'>
      <div className='Date'>
        {`${month} ${this.props.date.slice(1, 3)}, ${this.props.date.slice(3, 7)}: `}
      </div>
      <div className='batchSize'>
        {this.props.size[0].level1}
      </div>
      <div className='batchSize'>
        {this.props.size[0].level2}
      </div>
      <div className='batchSize'>
        {this.props.size[0].level3}
      </div>
    </div>)
  }
}

export default class Batch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchSize: null,
      sizes: null
        }
  }
  
  fetchParameters = (location) => {

    fetch(`http://${BASE_URL}/batch/${location}`)
    .then(response => response.json())
    .then((response) => { 
      this.setState({sizes: response});
    })
    .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.fetchParameters(this.props.location);
  }

  componentDidUpdate(prevProps, preState) {
    if (prevProps.location !== this.props.location) {
      this.fetchParameters(this.props.location);
    }
  }

  render() {
    if (this.state.sizes && this.props.location in this.state.sizes) {
      console.log(this.state.sizes);
      const date1 = Object.keys(this.state.sizes[this.props.location])[0];
      const date2 = Object.keys(this.state.sizes[this.props.location])[1];
      const date3 = Object.keys(this.state.sizes[this.props.location])[2];

      return (
        <div className='Batch'>
          Best Performing Prediction Batch Sizes 
          <Size date={ date1 } size={this.state.sizes[this.props.location][date1]}/>
          <Size date={ date2 } size={this.state.sizes[this.props.location][date2]}/>
          <Size date={ date3 } size={this.state.sizes[this.props.location][date3]}/>
        </div>
      )
    } else {
      return null;
    }
  }
}