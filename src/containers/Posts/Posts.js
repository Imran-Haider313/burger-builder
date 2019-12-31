import React, { Component } from "react";
import "./Posts.css";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";
class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "MaX"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  postClickHandler = id => {
    this.props.history.push("/posts/" + id);
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            title={post.title}
            key={post.id}
            author={post.author}
            clicked={() => this.postClickHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path="/posts/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
