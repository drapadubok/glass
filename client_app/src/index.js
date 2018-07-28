import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import registerServiceWorker from './registerServiceWorker';

import App from './views/App';
import defaults from "./graphql/defaults";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";
import { apiUrl } from "./config";


const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phoenixAuthToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

const client = new ApolloClient({
  uri: apiUrl,
  link: authLink.concat(httpLink),
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
	</ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
