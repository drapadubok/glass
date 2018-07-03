import gql from 'graphql-tag';

export const signInMutation = gql`
  mutation signInMutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;
