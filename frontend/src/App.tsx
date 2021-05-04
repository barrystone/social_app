import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Landing from './screens/Landing';
import Users from './components/Users';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <h1>App testing...</h1>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
        </Switch>

        <Switch>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
