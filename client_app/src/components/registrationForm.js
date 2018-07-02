import React from "react";
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';

import { signupMutation } from '../graphql/queries';

const handleSubmit = (payload, { props, setSubmitting, setErrors }) => {
  props.signupMutation({
    variables: { email: payload.email, password: payload.password }
  })
  .then(({ data }) => {
    localStorage.setItem('phoenixAuthToken', data.signupUser.token);
  })
  .then(
     () => {
        setSubmitting(false)
        console.log("Thenned")
     },
     error => {
         setSubmitting(false)
         setErrors(error)
         console.log("Errored")
         console.log(error)
     }
   )
};

export const Form = (props) => (
  <form onSubmit={props.handleSubmit}>
    <h2>Register new user</h2>
    <input id='email' value={props.values.email} onChange={props.handleChange}/>
    <input id='password' value={props.values.password} onChange={props.handleChange}/>
    <button type="submit" disabled={props.isSubmitting}>Register</button>
  </form>
)

export const RegistrationForm = compose(
   graphql(signupMutation, {"name": "signupMutation"}),
   withFormik({
      mapPropsToValues: props => ({ email: "", password: "" }),
      handleSubmit,
      displayName: 'RegistrationForm',
   })
)(Form)

export default RegistrationForm;
