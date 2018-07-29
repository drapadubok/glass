import React, { Component } from "react";
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { graphql, compose } from 'react-apollo';
import { Link, navigate } from "@reach/router";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { signinMutation } from '../../graphql/queries';
import { signupMutation } from '../../graphql/queries';


const handleSubmit = (payload, { props, setSubmitting, setErrors }) => {
  props.signinMutation({
    variables: { email: payload.email, password: payload.password }
  })
  .then(({ data }) => {
    localStorage.setItem('phoenixAuthToken', data.signinUser.token);
    navigate(`/`)
  })
  .then(
     () => {
        setSubmitting(false)
     },
     error => {
         setSubmitting(false)
         setErrors(error)
     }
   )
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing.unit,
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 360
  },
  card: {
    width: 400,
    margin: '0'
  },
  cardHeader: {    
    textAlign: "center"
  },  
  links: {
    textDecoration: 'none'
  }
});

class Form extends Component {
  render() {
    const { classes, handleSubmit, handleChange, isSubmitting, values } = this.props;

    return (
      <Grid container justify="center" direction="column" alignItems="center">
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} title="Authentication" />
          <CardContent className={classes.cardBody}>
            <form onSubmit={handleSubmit} className={classes.container} autoComplete="off">
              <TextField
                className={classes.textField}
                id="email"
                label="Email"
                value={values.email}
                type="text"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                className={classes.textField}
                id="password"
                label="Password"
                value={values.password}
                type="password"
                margin="normal"
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={isSubmitting}>
                Login
              </Button>
              <Button variant="contained" className={classes.button} type="submit" disabled={isSubmitting}>
                <Link to="/register" className={classes.links} >
                  Register
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export const Login = compose(
  graphql(signinMutation, {"name": "signinMutation"}),
  graphql(signupMutation, {"name": "signupMutation"}),
  withFormik({
    mapPropsToValues: props => ({ email: "", password: "" }),
    handleSubmit: handleSubmit,
    displayName: 'Login',
  })
)(Form)

export default withStyles(styles)(Login);
