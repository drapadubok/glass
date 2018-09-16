import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { graphql, compose } from 'react-apollo';

import { getEvents } from '../../graphql/queries';

const styles = theme => ({});



const EventList = ({ data: { branches, error, loading } }) => {
  console.log(branches)
  if (loading) return (<div>Loading...</div>);
  if (error) return (<div>Error!</div>);
  return (
    <div>
      <h4>Branches</h4>
      <ul>
        {
          branches.map(b => <li key={b.id}>{b.name}</li>)
        }
      </ul>
    </div>
  );
}
 
const ComposedEventList = graphql(getEvents)(EventList)

export default withStyles(styles)(ComposedEventList);



/*
        
        
<List selection divided verticalAlign='middle'>
              {
                data.branches[0].sources[0].events.filter(row => {
                  return this.composedFilter(row, nameFilter, propertyFilter, ownerFilter);
                }).map(item => (
                  <div key={item.name} >
                    <List.Item className={`event-list-item ${isEventSelected && item.name === selectedEvent.name ? "active" : ""}`}>
                      <List.Content floated='left' onClick={this.onSelectEvent.bind(this, item)} as={Link} to={`/events/${source}/${branch}/${item.name}`}>
                        {item.name}
                      </List.Content>
                      <List.Content floated='right'>
                        <Button.Group>
                          <Button as={Link} to={`/events/${source}/${branch}/${item.name}/edit`}>
                            <Icon name='write' />
                          </Button>
                          <Button>
                            <Icon name='trash' />
                          </Button>
                        </Button.Group>
                      </List.Content>
                    </List.Item>
                  </div>
                ))
              }
            </List>

                          <List.Content floated='right'>
                            <Link onClick={this.onSelectEvent.bind(this, item)} to={`/events/${source}/${branch}/${item.name}/edit`}>
                              <Icon size="small" name="pin" />
                            </Link>
                            <Icon size="small"name="trash" />
                          </List.Content>
  onSelectEvent(eventData) {
    this.setState({ isEventSelected: true });
  }
  objectToList(obj) {
    let properties = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          properties.push(obj[prop]);
      }
    }
    return properties;
  }
  
  render() {
    const { source, branch } = this.props.match.params;
    const { loading, events, selectEvent, selectedEvent, branches } = this.props;
    const { isEventSelected } = this.state;
    const { nameFilter, propertyFilter, ownerFilter } = this.props.eventFilters;
    let filteredEvents = this.composedFilter(events, nameFilter, propertyFilter, ownerFilter);
    return (
      <div>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Grid stackable padded columns={2}>
          <Grid.Column width={3}>
            <SelectorBox branches={ branches } />
            <EventFilters branches={ branches } />
            {
              filteredEvents === [] && selectedEvent !== undefined ? (
                <p>Loading...</p>
              ) : (
                <List selection divided verticalAlign='middle'>
                  {filteredEvents.map(item => (
                    <List.Item                      
                      key={item.name}                      
                      className={`event-list-item ${isEventSelected && item.name === selectedEvent.name ? "active" : ""}`}>
                      <List.Header onClick={selectEvent.bind(this, item)} as={Link} to={`/events/${source}/${branch}/${item.name}`}>
                        {item.name}
                      </List.Header>
                      <List.Content floated='right'>
                        <Link onClick={selectEvent.bind(this, item)} to={`/events/${source}/${branch}/${item.name}/edit`}>
                          <Icon size="small" name="pin" />
                        </Link>
                        <Icon size="small"name="trash" />
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              )
            }
          </Grid.Column>
          <Grid.Column width={13}>
            <Switch>     
              <Route
                path="/events/:source/:branch/:id/edit"
                component={EventEditor} />
              <Route path="/events/:source/:branch/:id" component={EventView} />
            </Switch>
          </Grid.Column>
        </Grid>
        <Divider inverted section />
      </div>
    );
  }
}
*/
