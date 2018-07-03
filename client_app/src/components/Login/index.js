import React, { Component } from "react";
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { graphql, compose } from 'react-apollo';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { signInMutation } from '../../graphql/queries';

const handleSubmit = (payload, { props, setSubmitting, setErrors }) => {
  props.signInMutation({
    variables: { email: payload.email, password: payload.password }
  })
  .then(({ data }) => {
    localStorage.setItem('phoenixAuthToken', data.signInUser.token);
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
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Form extends Component {
  render() {
    const { classes, handleSubmit, handleChange, isSubmitting, values } = this.props;

    return (
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
      </form>
    )
  }
}

export const Login = compose(
   graphql(signInMutation, {"name": "signInMutation"}),
   withFormik({
      mapPropsToValues: props => ({ email: "", password: "" }),
      handleSubmit,
      displayName: 'Login',
   })
)(Form)

export default withStyles(styles)(Login);
