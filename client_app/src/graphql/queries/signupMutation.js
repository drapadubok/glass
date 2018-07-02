import gql from 'graphql-tag';

export const signupMutation = gql`
  mutation signupMutation($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {      
      token
    }
  }
`;
