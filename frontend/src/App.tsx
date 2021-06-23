import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from 'apollo-link-context';

// import './App.css';
import './assets/css/main.css';

import Landing from './pages/Landing';
import Users from './components/Users';
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsAuthenticated from './components/IsAuthenticated';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SingleStory from './pages/SingleStory';

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

// solve `Cache data may be lost when replacing` warning
const cache = new InMemoryCache({
  typePolicies: {
    Story: {
      fields: {
        likes: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    },
    User: {
      fields: {
        likedStories: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  link: link as any,
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Router>
          <Switch>
            <Route path="/landing">
              <Landing />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <IsAuthenticated>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/story/:id">
                <SingleStory />
              </Route>
            </IsAuthenticated>
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
