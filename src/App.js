import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      username: "",
      posts: {}
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // let username = this.state.username;
    // debugger
    // fetch(`https://www.reddit.com/user/kijafa/comments.json`, {
    //   method: 'GET'
    // }).then(result => {
    //   console.log(result)
    // })
    // debugger
    // fetch('')
    fetch('https://www.reddit.com/user/kijafa/comments.json', {
      method: 'GET'
    }).then(response => {
      console.log("Hi")
      // response.json().then(body => {
      //   this.setState({comments: body.data.children})
      // })
    }).catch(error => console.log("Errors!"))
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ username: e.currentTarget.value});
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
            <input id="username" type="text" onChange={this.handleInput}/>
            <input type="submit" onClick={this.handleSubmit}/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
