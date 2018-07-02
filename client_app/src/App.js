import React, { Component } from 'react';

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
          return ()
        }}
      </Query>
    );
  }
}



/*
<Drawer open={true}>
  <List component="nav">
    <ListItem button>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button component="a" href="#simple-list">
      <ListItemText primary="Spam" />
    </ListItem>
  </List>
</Drawer>

<EventForm />
<LocalStateForm />
<RegistrationForm />
<p>Current local var: {data.localState.localStateParam}</p>
*/
