import React from 'react';
import './Header.css';
import logo from './logo.svg';

export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    <div className='header'>
      <img src={logo} className="App-logo"/>
      <div className="HeaderText">Hack Covid</div>
    </div>)
  }
}
