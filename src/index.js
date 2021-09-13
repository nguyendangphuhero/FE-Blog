import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import AuthPage from './components/AuthPage';
import App from './App';

// const devOrigin = 'http://localhost:8000';
// const origin = window.location.origin;
// const baseUrl = origin === 'http://localhost:3000' ? devOrigin : origin;

const token = window.localStorage.getItem('token');

const link = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
  headers: {
    authorization: token ? `JWT ${token}` : '',
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {!window.localStorage.getItem('token') ? <AuthPage /> : <App />}
  </ApolloProvider>,
  document.getElementById('root')
);
