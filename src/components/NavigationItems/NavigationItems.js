import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
    <NavigationItem Link='/' text='Burger Builder' active={true}/>
    <NavigationItem Link='/' text='Checkout'/>
    </ul>
  );
}

export default NavigationItems;
