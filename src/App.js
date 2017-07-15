import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// import 'whatwg-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      username: "",
      posts: [],
			comments: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.updateComments = this.updateComments.bind(this);
		
  }

	updateComments(comments) {
		this.setState({comments: comments})
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}

	parseJSON(response) {
		return response.json();
	}

  handleSubmit() {

		debugger
    fetch('https://www.reddit.com/user/kijafa/comments.json')
			.then(result => this.checkStatus(result))
			.then(response => this.parseJSON(response))
			.then(data => {
				debugger;
				console.log('request succeeded within JSON response', data);
				this.updateComments(data.data.children);
				debugger
			}).catch(function(error) {
    console.log('request failed', error)
		})
    // let username = this.state.username;
    // debugger
    // fetch(`https://www.reddit.com/user/kijafa/comments.json`, {
    //   method: 'GET'
    // }).then(result => {
    //   console.log(result)
    // })

    // debugger
    // fetch('')
    // fetch('https://www.reddit.com/user/kijafa/comments.json')
		// 	.then(response => {
    //   	console.log(response.json);
   	// 	 }).catch(error => console.log("Errors!"))
 
 
    // debugger
    // let response = fetch('https://www.reddit.com/user/kijafa/comments.json', {
    //   method: 'GET'
    // })
    // debugger
    // let text = response.json()
    // console.log(text);
    // debugger
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ username: e.currentTarget.value});
  }

	renderComments() {
		debugger
		if (this.state.comments.length === 0) {
			return(
				<span>User has no comments</span>
			)
		} else {
			return(
				<ul>
					{this.state.comments.map(comment => this.renderComment(comment))}
				</ul>
			)
		}
	}

	renderComment(comment) {
		return(
			<li>{comment.data.body}</li>
		)
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
				<div>
					{this.renderComments()}
				</div>
      </div>
    );
  }
}

export default App;
