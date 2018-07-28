import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Router } from "@reach/router";

import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import Login from '../../components/Login';
import EventEditor from '../../components/EventEditor';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

const Home = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center">
  <Grid item xs={3}>    
    <h2>Welcome</h2>
  </Grid>
</Grid> 
);

const Dashboard = () => (
    <Grid container wrap="nowrap" justify="center" spacing={16}>
      <Grid item>
        <h2>Dashboard</h2>
      </Grid>
    </Grid>
);

class Content extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Home path="/" />
          <Login path="login" />
          <AuthenticatedRoute path="dashboard" component={Dashboard} />
          <AuthenticatedRoute path="eventeditor" component={EventEditor} />
        </Router>
      </main>
    );
  }
}

export default withStyles(styles)(Content);

/*

import { Query } from "react-apollo";
import gql from "graphql-tag";

import EventForm from './components/eventForm';
import LocalStateForm from './components/localStateForm';
import RegistrationForm from './components/registrationForm';


class App extends Component {
  render() {
    const GET_EVENT = gql`
      {
        localState @client {
          localStateParam
        },
        branches {
          id,
          name
        }
      }
    `;
    const { classes } = this.props;

    return (
      <Query query={GET_EVENT}>
        {({ loading, error, data }) => {
          if (loading) return (<div>Loading!</div>);
          if (error) return (<div>Error!</div>);
          return (
            <EventForm />
            <LocalStateForm />
            <RegistrationForm />
            <p>Current local var: {data.localState.localStateParam}</p>
          )
        }}
      </Query>
    );
  }
}

*/