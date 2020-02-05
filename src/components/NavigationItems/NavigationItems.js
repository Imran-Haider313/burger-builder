import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem Link="/" text="Burger Builder" exact />
      <NavigationItem Link="/orders" text="Orders" />
    </ul>
  );
};

export default NavigationItems;
