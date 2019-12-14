import React from 'react';
import classes from './Logo.css';
import OriginalLogo from '../../assets/images/burger-logo.png';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={OriginalLogo} />
  </div>
)

export default Logo;
