import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

// Components
import Thread from './components/chat/Thread';

const httpLink = new HttpLink({ uri: 'http://localhost:5000/server' });
const wsLink = new WebSocketLink(
  {
    uri: 'ws://localhost:5000/chats',
    options: { reconnect: true }
  }
);

const splitLink = split(
  ({ query }) =>
    {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
  wsLink, httpLink,
);

const apolloClient = new ApolloClient( { link: splitLink, cache: new InMemoryCache() } );

const App = () => (
  <ApolloProvider client={ apolloClient }>
    <Switch>
      <Route path="/:name" component={ Thread } />
    </Switch>
  </ApolloProvider>
);

export default App;