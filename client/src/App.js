import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

// Components
import Thread from './components/chat/Thread';

// Store
import dataStore from './context/store';

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });
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

// Apollo client setup
const apolloClient = new ApolloClient( { link: splitLink } );

const App = () => (
  <ApolloProvider client={ apolloClient }>
    <Provider store={ dataStore }>
      <Switch>
        <Route path="/:name" component={ Thread } />
      </Switch>
    </Provider>
  </ApolloProvider>
);

export default App;