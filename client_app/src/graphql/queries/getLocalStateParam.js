import gql from 'graphql-tag';

export const getLocalStateParamQuery = gql`
  query {
    localState @client {
      localStateParam
    }
  }
`;
