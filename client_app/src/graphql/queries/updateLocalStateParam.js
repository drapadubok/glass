import gql from 'graphql-tag';

export const updateLocalStateParamMutation = gql`
  mutation updateLocalStateParam($value: String!) {
    updateLocalStateParam(value: $value) @client {
      localStateParam
    }
  }
`;
