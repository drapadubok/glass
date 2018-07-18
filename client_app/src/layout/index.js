import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import GridItem from '../ui_components/GridItem';

import Appbar from './Appbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';


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
        <CssBaseline />
        <Appbar />
        <Sidebar />
        <MainContent />
      </div>
    );
  }
}

export default withStyles(styles)(Layout);

/*
AuthenticatedRoute exact path="/signout" component={Login} />

        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Main />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Main />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Main />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Main />
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={4}>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          </GridItem>
        </Grid>
        
        */
