import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Router } from "@reach/router";

import Signup from '../../components/Signup';
import Login from '../../components/Login';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const Home = () => (
  <div>
    <h2>Welcome</h2>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Home path="/" />
          <Dashboard path="dashboard" />
          <Signup path="register" />
          <Login path="login" />
        </Router>
      </main>
    );
  }
}

export default withStyles(styles)(Main);
