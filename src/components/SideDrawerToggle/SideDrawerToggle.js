import React from "react";
import classes from "./SideDrawerToggle.css";

const SideDrawerToggle = props => (
  <div onClick={props.toggleMenu} className={classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default SideDrawerToggle;
