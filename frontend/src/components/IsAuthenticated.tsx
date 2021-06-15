import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router';

const IS_LOGIN_IN = gql`
  {
    me {
      id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

const IsAuthenticated = ({ children }: Props) => {
  const { loading, error, data } = useQuery(IS_LOGIN_IN);

  if (loading) return <h2>loading...</h2>;
  if (error)
    if (error.message === 'Not Authorised!') {
      return <Redirect to={{ pathname: '/landing' }} />;
    } else {
      return <p>{error.message}</p>;
    }
  // Old code and I remain it, maybe it has some purpose but I can't figure it out for now.
  // if (!data.me) {
  //   return <Redirect to={{ pathname: '/' }} />;
  // }

  // in order to use this in App.tsx, we should wrap this in a fragment
  return <>{children}</>;
};

export default IsAuthenticated;
