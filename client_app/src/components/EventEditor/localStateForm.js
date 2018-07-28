import React from 'react';
import { graphql, compose } from 'react-apollo';

import { updateLocalStateParamMutation } from '../../graphql/queries';


export class LocalForm extends React.Component {

  handleClick = value => {
    this.props.updateLocalStateParam({ variables: { value } });
  };

  render() {
    return (
      <div className="sidebar">
        <ul style={{ padding: 0 }}>
          <li className="sidebar-item" onClick={() => this.handleClick('The Bread Code')}>React</li>
          <li className="sidebar-item" onClick={() => this.handleClick('Architect Awesome')}>Apollo Client</li>
          <li className="sidebar-item" onClick={() => this.handleClick('Andrico Karoulla')}>Next.js</li>
        </ul>
      </div>
    )
  }
};

export default compose(graphql(updateLocalStateParamMutation, { name: 'updateLocalStateParam' }))(LocalForm);
