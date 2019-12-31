import React, { Component } from "react";
import Posts from "../Posts/Posts.js";
import NewPost from "../NewPost/NewPost.js";
import "./Blog.css";
import { Route, NavLink, Redirect } from "react-router-dom";

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/posts/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/new-post" component={NewPost} />
        <Route path="/posts" component={Posts} />
        <Redirect path="/" to="/posts" />
      </div>
    );
  }
}

export default Blog;
