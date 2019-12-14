import React from 'react';
import classes from './NavigationItem.css';

const NavigationItem = (props) => (
      <li className={classes.NavigationItem}>
        <a href={props.Links} className={props.active ? classes.active : null}>{props.text}</a>
      </li>
)

export default NavigationItem;
