import React, { Component } from 'react';
import { Redirect } from '@reach/router';


const AuthenticatedRoute = ({ component: ComposedComponent, ...props }) => {
  class Authentication extends Component {
    render() {
      const token = localStorage.getItem("phoenixAuthToken");
      if (!token) {        
        return <Redirect from={props.uri} to='login' noThrow />
      } else {
        return <ComposedComponent {...props}/>
      }
    }
  }

  return <Authentication/>
}

export default AuthenticatedRoute;
