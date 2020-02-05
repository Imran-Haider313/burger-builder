import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';

const NavigationItem = (props) => (
      <li className={classes.NavigationItem}>
        <NavLink to={props.Link} exact={props.exact} activeClassName={classes.active}>{props.text}</NavLink>
      </li>
)

export default NavigationItem;
