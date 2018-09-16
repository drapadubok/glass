import React, { Component } from 'react';
import { Table, Segment, Header, Dimmer, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { selectEvent } from '../eventsDuck';


class EventView extends Component {

  state = {}

  objectToList(obj) {
    let properties = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          properties.push(obj[prop]);
      }
    }
    return properties;
  }

  componentDidMount() {
    //const { id } = this.props.match.params;
    //this.props.selectEvent(id);
  }

  render() {
    const { source, branch, id } = this.props.match.params;
    const GET_EVENT = gql`
      {        
        branches(name:"${branch}") {
          sources(name:"${source}") {
            events(name:"${id}") {
              name
              owner
              description
              properties {
                name
                status
                type
                description
                load
                isPersonal
                addedAt
              }
            }
          }
        }
      }
    `;
    return (
      <Query query={GET_EVENT}>
        {({ loading, error, data }) => {
          if (loading) return (
            <Dimmer active={loading}>
              <Loader />
            </Dimmer>
          );
          if (error) return (<div>Error!</div>);
          
          const selectedEvent = data.branches[0].sources[0].events[0];
          const properties = this.objectToList(selectedEvent.properties);
          console.log(selectedEvent);
          console.log(properties)

          return (
            <Segment basic>
              <Header as='h3'>{selectedEvent.name}</Header>
              <p>Owner: {selectedEvent.owner}</p>
              <p>{selectedEvent.description}</p>
              <Table celled padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Load</Table.HeaderCell>
                    <Table.HeaderCell>Is Personal Info</Table.HeaderCell>
                    <Table.HeaderCell>Added on</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {properties.map(eventProp => (
                    <Table.Row key={eventProp.name}>
                      <Table.Cell>{eventProp.name}</Table.Cell>
                      <Table.Cell>{eventProp.status}</Table.Cell>
                      <Table.Cell>{eventProp.type}</Table.Cell>
                      <Table.Cell>{eventProp.description}</Table.Cell>
                      <Table.Cell>{eventProp.load.toString()}</Table.Cell>
                      <Table.Cell>{eventProp.isPersonal.toString()}</Table.Cell>
                      <Table.Cell>{eventProp.addedAt}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          )
        }}
      </Query>
    );
  }
}

export default withRouter(EventView)