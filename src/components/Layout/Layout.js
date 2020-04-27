import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from "../../hoc/Aux";
import Toolbar from "../Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showBackdrop: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({
      showBackdrop: false
    });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showBackdrop: !prevState.showBackdrop };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          onToggleMenu={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showBackdrop}
          clicked={this.sideDrawerCloseHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
