import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Router } from "@reach/router";

import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import Signup from '../../components/Signup';
import Login from '../../components/Login';
import EventEditor from '../../components/EventEditor';

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

class MainContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Home path="/" />
          <Signup path="register" />
          <Login path="login" />
          <AuthenticatedRoute path="dashboard" component={Dashboard} />
          <AuthenticatedRoute path="eventeditor" component={EventEditor} />
        </Router>
      </main>
    );
  }
}

export default withStyles(styles)(MainContent);

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