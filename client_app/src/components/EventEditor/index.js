import React, { Component } from 'react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addEvent } from '../../graphql/queries';


class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {},
      properties: [
        {id: 1},
        {id: 2},
        {id: 3}
      ]
    }
  }

  addProperty() {
    this.setState(prevState => ({
      properties: [...prevState.properties, {}]
    }))
  }
  
  render() {
    const { handleSubmit, handleChange, isSubmitting, values } = this.props;
    console.log(this.state.properties)
    
    return (
      <form onSubmit={handleSubmit}>
        <h1>Edit Event</h1>
        <TextField        
          id="name"
          label="Event name"
          value={values.name}
          type="text"
          margin="normal"
          onChange={handleChange}
        />
        <div>
          {
            this.state.properties.map(p => <div key={p.id}>I'm a prop</div>)
          }
        </div>
        <Button disabled={isSubmitting} onClick={this.addProperty.bind(this)}>Add Property</Button>
        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </form>
    );
  }
}

const withSemanticUIFormik = props => WrappedComponent =>{
  return withFormik(props) (
    class extends Component {
      handleBlur = (e, data) => {
        if(data && data.name){
          this.props.setFieldValue(data.name, data.value);
          this.props.setFieldTouched(data.name);
        }
      }
      handleChange = (e, data) => {
        if (data && data.name) {
          this.props.setFieldValue(data.name,data.value);
        }
      }
      render(){
        return <WrappedComponent {...this.props}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
        />
      }
    }
  )
}

const EnhancedEventEditor = withSemanticUIFormik({
  mapPropsToValues: props => ({     
    name: '',
    grants: 'looker,api_user',
    owner: '',
    description: '',
    added_at: new Date(),
    load_to_track_table: true,
    deleted: false,
    properties: []
  }),
  handleSubmit: (payload, { props, setSubmitting, setErrors }) => {
    props.addEventMutation({ variables: { name: payload.name } })
      .then(
        () => {setSubmitting(false)},
        error => {
          setSubmitting(false)
          setErrors(error)
        }
      )     
  },
  displayName: 'EventEditorForm',
})(EventForm);

const EventEditor = compose(
  graphql(addEvent, {"name": "addEventMutation"}),
)(EnhancedEventEditor)

export default EventEditor;



  