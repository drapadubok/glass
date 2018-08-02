import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from "react-apollo";
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

const authErrorLink = onError(({ response, networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
    localStorage.removeItem('phoenixAuthToken');
  }
});

const link1 = authLink.concat(authErrorLink);
const link2 = link1.concat(httpLink)

const client = new ApolloClient({
  link: link2, //authLink.concat(httpLink),
  clientState: {
    defaults,
    resolvers,
    typeDefs
  },
  cache: new InMemoryCache()
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
