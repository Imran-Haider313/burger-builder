import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../Logo/Logo";
import Backdrop from "../Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../hoc/Aux";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
