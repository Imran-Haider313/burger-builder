import React, { Component } from "react";
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
        <Toolbar onToggleMenu={this.sideDrawerToggleHandler} />
        <SideDrawer
          show={this.state.showBackdrop}
          clicked={this.sideDrawerCloseHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
