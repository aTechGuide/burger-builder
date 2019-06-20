import React from 'react';
import classes from './Toolbar.module.css';

const Toolbar = () => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <div>LOGO</div>
      <nav>
        Links
      </nav>
    </header>
  );
}

export default Toolbar;