import gql from "graphql-tag";

export default (_, { value }, { cache }) => {
  const query = gql`
    query getLocalStateParam {
      localState @client {
        localStateParam
      }
    }
  `;
  // Get previous state
  const previousState = cache.readQuery({ query });
  // Update the specific value in the state
  const data = {
    localState: {
      ...previousState.localState,
      localStateParam: value
    }
  }
  cache.writeQuery({query, data});
  return null;
};
