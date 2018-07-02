import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { signIn } from '../sessionDuck'

const renderFormInput = ({ input, meta, ...rest }) =>
  <Form.Input {...input} {...rest} />

class Login extends React.Component {
	constructor(props) {
		super(props)
	}
  onSubmit(values) {
    const { email, password } = values
    this.props.signIn(email, password)
	}
	render() {
    const { handleSubmit } = this.props
		return (
	    <Grid textAlign='center'>
	      <Grid.Column style={{ maxWidth: 450 }}>
	        <Header as='h2' textAlign='center'>
	          {' '}Sign In
	        </Header>
	        <Form size='large' onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
	          <Segment stacked>
	            <Field
	              name='email'
								icon='user'
								iconPosition='left'
	              placeholder='E-mail address'
								fluid
	              component={renderFormInput}
	            />
							<Field
	              name='password'
								type='password'
								icon='lock'
								iconPosition='left'
	              placeholder='Password'
								fluid
	              component={renderFormInput}
	            />
	            <Button fluid size='large'>Sign In</Button>
	          </Segment>
	        </Form>
          <Button fluid size='large' content={<Link to="/register">Sign Up</Link>} />
	      </Grid.Column>
	    </Grid>
		)
	}
}

Login = reduxForm({
  form: 'loginForm', // a unique identifier for this form
})(Login);

const mapStateToProps = (state) => (
  state.session
)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
