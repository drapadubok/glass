import gql from 'graphql-tag';

export const signoutMutation = gql`
  mutation signoutMutation($token: String!) {
    signoutUser(token: $token) {
        success
    }
  }
`;
