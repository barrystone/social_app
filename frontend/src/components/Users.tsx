import React from 'react';
import { gql, useQuery } from '@apollo/client';

const USERS_QUERY = gql`
  {
    allUsers {
      id
      name
    }
  }
`;

interface User {
  name: string;
}

const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <h2>loading</h2>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data.allUsers.map((user: User) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
};

export default Users;
