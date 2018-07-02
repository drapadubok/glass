import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withFormik } from 'formik';

import { addEvent } from '../graphql/queries';


const handleSubmit = (payload, { props, setSubmitting, setErrors }) => {
  props.addEventMutation({ variables: { name: payload.name } })
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

export const AddEventForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input id='name' value={props.values.name} onChange={props.handleChange}/>
    <button type="submit" disabled={props.isSubmitting}>Add Event</button>
  </form>
)

const EventForm = compose(
   graphql(addEvent, {"name": "addEventMutation"}),
   withFormik({
      mapPropsToValues: props => ({ name: '' }),
      handleSubmit,
      displayName: 'EventForm',
   })
)(AddEventForm)

export default EventForm;
