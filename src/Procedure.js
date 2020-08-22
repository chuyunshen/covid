import React from 'react';
import './Procedure.css';

export default class Procedure extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    console.log(this.state.locations);
    return (
      <div className='Procedure'>
        Procedure
        <div className='Explanation'>
          <p> Explain our procedure. </p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
      </div>
    )


  }
}
