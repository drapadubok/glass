import gql from 'graphql-tag';

export const signinMutation = gql`
  mutation signinMutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;
