import React, { Component } from "react";
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { graphql, compose } from 'react-apollo';

import { Link } from "@reach/router";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { signinMutation } from '../../graphql/queries';
import { signupMutation } from '../../graphql/queries';

const handleSubmitLogin = (payload, { props, setSubmitting, setErrors }) => {
  props.signinMutation({
    variables: { email: payload.email, password: payload.password }
  })
  .then(({ data }) => {
    localStorage.setItem('phoenixAuthToken', data.signIiUser.token);
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

const handleSubmitSignup = (payload, { props, setSubmitting, setErrors }) => {
  props.signupMutation({
    variables: { email: payload.email, password: payload.password }
  })
  .then(({ data }) => {
    localStorage.setItem('phoenixAuthToken', data.signupUser.token);
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
    flexWrap: '1',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing.unit,
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 400,
  },
  links: {
    textDecoration: 'none'
  }
});

class Form extends Component {
  render() {
    const { classes, handleSubmit, handleChange, isSubmitting, values } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
              <Card className={classes.card}>
                <CardHeader title="Authentication" />
                <CardContent>
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
        </Grid>
      </div>
    )
  }
}

export const Login = compose(
   graphql(signinMutation, {"name": "signinMutation"}),
   graphql(signupMutation, {"name": "signupMutation"}),
   withFormik({
      mapPropsToValues: props => ({ email: "", password: "" }),
      handleSubmitSignup,
      displayName: 'Login',
   })
)(Form)

export default withStyles(styles)(Login);
