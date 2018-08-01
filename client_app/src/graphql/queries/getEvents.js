import gql from 'graphql-tag';

export const getEvents = gql`
  query {
    branches {      
      id
      name
      sources {
        id
        name
        events {
          id
          name
          description
          properties {
            id
            name
            type
          }
        }
      }
    }
  }
`;
