import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import logo from './logo.svg';
import './App.css';
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

    return (
      <Query query={GET_EVENT}>
        {({ loading, error, data }) => {
          if (loading) return (<div>Loading!</div>);
          if (error) return (<div>Error!</div>);
          console.log(data)
          return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
              <EventForm />
              <LocalStateForm />
              <p>Current local var: {data.localState.localStateParam}</p>
              <RegistrationForm />
            </div>
          )
        }}
      </Query>
    );
  }
}

export default App;
