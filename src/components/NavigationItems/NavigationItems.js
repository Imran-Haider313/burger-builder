import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem Link="/" text="Burger Builder" exact />
      {props.isAuthenticated ? <NavigationItem Link="/orders" text="Orders" /> : null }
      {props.isAuthenticated ?
        <NavigationItem Link="/logout" text="Logout" />
        : <NavigationItem Link="/auth" text="Auth" />
      }

    </ul>
  );
};

export default NavigationItems;
