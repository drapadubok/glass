import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import LogoutButton from '../Logout';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  flex: {
    flexGrow: 1,
  }
});

class Appbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap className={classes.flex}>
            Glass - an empty space to fill
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Appbar);
