import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from 'apollo-link-context';

import './App.css';

import Landing from './screens/Landing';
import Users from './components/Users';
import Signup from './pages/Signup';
import Login from './pages/Login';

// do this instead of easy apollo client, reason is in necessary for set up header
const httpLink = new HttpLink({ uri: 'http://localhost:4000' });
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem('social_app-token');

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <h1>App testing...</h1>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </>
    </ApolloProvider>
  );
}

export default App;

// export default () => (
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );