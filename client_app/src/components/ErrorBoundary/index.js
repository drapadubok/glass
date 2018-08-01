/** TODO: if authError => redirect to login form */
import React, { Component } from 'react';
import Raven from 'raven-js';


export default class SentryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    Raven.config('https://d03c14f1976a467a82107c6cffe8629e@sentry.io/1237768').install();
  }

  componentDidCatch(error, info) {
    this.setState({ error: error });
    console.log(error, info);
    Raven.captureException(error, { extra: info });
  }

  render() {
    if (this.state.error) {
      return (
        <h1>Something went wrong.</h1>
      )
    }
    return this.props.children;
  }
}