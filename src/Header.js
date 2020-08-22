import React from 'react';
import './Header.css';

export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    <div className='header'>
      Hack Covid
    </div>)
  }
}
