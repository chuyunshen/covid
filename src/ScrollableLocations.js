import React from 'react';
import './ScrollableLocations.css';

class LocationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className='LocationTab'>
        {this.props.location}   
      </div>
    )
  }
}

export default class ScrollableLocations extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div className='ScrollableLocations' >
      {this.props.locations.map((eachLocation) =>{
         return (<LocationTab key={eachLocation.location} location={eachLocation.location} />)
         })}
      </div>
    );

  }
}
