import gql from 'graphql-tag';

export const getEvent = gql`
  query {
    branches {
      id,
      name
    }
  }
`;
