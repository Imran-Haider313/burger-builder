import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.loadData();
  }

  componentDidUpdate() {
    console.log("FULL POOST componentDidUpdate");
    this.loadData();
  }

  loadData() {
    if (
      this.props.match.params.id &&
      (!this.state.loadedPost ||
        this.state.loadedPost.id !== +this.props.match.params.id)
    ) {
      axios
        .get(
          "https://jsonplaceholder.typicode.com/posts/" +
            this.props.match.params.id
        )
        .then(response => {
          this.setState({ loadedPost: response.data });
        });
    }
  }
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Fetching data!</p>;

      if (this.state.loadedPost) {
        post = (
          <div className="FullPost">
            <h1>{this.state.loadedPost.title}</h1>
            <p>{this.state.loadedPost.body}</p>
            <div className="Edit">
              <button className="Delete">Delete</button>
            </div>
          </div>
        );
      }
    }

    return post;
  }
}

export default FullPost;
