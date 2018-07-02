import gql from 'graphql-tag';

export const addEvent = gql`
  mutation addEvent($name: String!) {
    createBranch(name: $name) {
      id
      name
    }
  }
`;
