import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getAuthDataFromCookies } from '../helpers/authHelper';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/subscriptions',
    options: {
      reconnect: true
    }
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

const authLink = setContext((_, { headers }) => {
    const token = getAuthDataFromCookies()?.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

export const createApolloClient = () => {
    return new ApolloClient({
        link: authLink.concat(splitLink),
        cache: new InMemoryCache()
    });
}