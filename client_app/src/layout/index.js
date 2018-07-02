import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Navbar from './navbar';
import Sidebar from './sidebar';
import Main from './main';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  }
});

class Layout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <Sidebar />
        <Main />
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
