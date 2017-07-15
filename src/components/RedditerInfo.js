import React, { Component } from 'react';

class RedditerInfo extends Component {
  constructor(props) {
    super(props);
    this.state= {
      username: "",
      posts: [],
			comments: [],
			displayedInfo: 'posts',
			error: ''
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
		this.setState({comments: comments, error: ''})
	}
	updatePosts(posts) {
		this.setState({posts: posts, error: ''})
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

  handleSubmit(e) {
		e.preventDefault();
    // let username = this.state.username;

		fetch('https://www.reddit.com/user/kijafa/submitted.json')
			.then(result => this.checkStatus(result))
			.then(response => this.parseJSON(response))
			.then(postsResponse => {
				console.log('request succeeded within JSON response', postsResponse);
				this.updatePosts(postsResponse.data.children);
				debugger
			}).catch(function(error) {
    	console.log('request failed', error)
		})
		
    fetch('https://www.reddit.com/user/kijafa/comments.json')
			.then(result => this.checkStatus(result))
			.then(response => this.parseJSON(response))
			.then(data => {
				console.log('request succeeded within JSON response', data);
				this.updateComments(data.data.children);
				debugger
			}).catch(function(error) {
    	console.log('request failed', error)
		})
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ username: e.currentTarget.value});
  }

	renderComments() {
		if (this.state.comments.length === 0) {
			return(
				<span>User has no comments</span>
			)
		} else {
			return(
				<ul>
					{this.state.comments.map(comment => this.renderComment(comment.data))}
				</ul>
			)
		}
	}

	renderPosts() {
		if (this.state.posts.length === 0) {
			return(
				<span>User has no posts</span>
			)
		} else {
			return(
				<ul>
					{this.state.posts.map(post => this.renderPost(post.data))}
				</ul>
			)
		}
	}

	renderComment(comment) {
		return(
			<li key={comment.id}>
				{comment.link_title}<br/>
				{comment.author}<br/>
				{comment.score}<br/>
				{comment.body}<br/>
			</li>
		)
	}

	renderPost(post) {
		return(
			<li key={post.id}>
				{post.title}<br/>
				{post.score}<br/>
				{post.url}<br/>
			</li>
		)
	}

	render() {
    return (
      <div className="redditer-info">
        <div className="form">
          <form action="">
            <label htmlFor="username">Input the username of the user you want to stalk: </label>
            <input id="username" type="text" onChange={this.handleInput}/>
            <input type="submit" onClick={this.handleSubmit}/>
          </form>
        </div>
				<div>
					POSTS
					{this.renderPosts()}
					COMMENTS
					{this.renderComments()}
				</div>
      </div>
    );
  }
}

export default RedditerInfo;
