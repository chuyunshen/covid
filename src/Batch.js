import React from 'react';
import { convertToDate} from './utils'
import './Batch.css';

class Size extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    <div className='Size'>
      <div className='Date'>
        {/* {convertToDate(this.props.size.date)} */}
        {this.props.size.date}
      </div>
      <div className='batchSize'>
        {this.props.size.size1}
      </div>
      <div className='batchSize'>
        {this.props.size.size2}
      </div>
      <div className='batchSize'>
        {this.props.size.size3}
      </div>
    </div>)
  }
}

export default class Batch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchSize: null,
      sizes: [
        {date: '03122020', size1: 15, size2: 20, size3: 30},
        {date: '03132020', size1: 10, size2: 20, size3: 30},
        {date: '03142020', size1: 12, size2: 20, size3: 30}
      ]
    }
  }
  
  fetchParameters = () => {
    this.setState({
      sizes: [
        {date: '03122020', size1: 15, size2: 20, size3: 30},
        {date: '03132020', size1: 10, size2: 20, size3: 30},
        {date: '03142020', size1: 12, size2: 20, size3: 30}
      ]
 });
  }

  componentDidMount() {
    this.fetchParameters();
  }

  render() {

      return (
        <div className='Batch'>
          Best Performing Prediction Parameters
          <Size size={this.state.sizes[0]}/>
          <Size size={this.state.sizes[1]}/>
          <Size size={this.state.sizes[2]}/>
          {/* <BatchSizeSelector heading={'Batch Size 1'}/>
          <BatchSizeSelector heading={'Batch Size 2'}/>
          <BatchSizeSelector heading={'Batch Size 3'}/> */}
        </div>
      )
  }
}