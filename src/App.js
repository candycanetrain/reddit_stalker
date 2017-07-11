import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      username: ""
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(username) {

  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ username: e.currentTarget.value});
    debugger
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to RedditerStalker</h2>
        </div>
        <div className="form">
          <form action="">
            <label htmlFor="username">Input the username of the user you want to stalk: </label>
            <input id="username" type="text" onClick={this.handleInput}/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
