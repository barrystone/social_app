import React from 'react';
import { gql, useQuery } from '@apollo/client';
import CreateProfile from '../components/CreateProfile';
import UpdateProfile from '../components/UpdateProfile';

export const ME_QUERY = gql`
  {
    me {
      id
      profile {
        id
        bio
        location
        website
        avatar
      }
    }
  }
`;

const Profile = () => {
  const { loading, data, error } = useQuery(ME_QUERY);

  if (loading) return <h2>Loading......</h2>;
  if (error) return <h3>{error.message}</h3>;
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <h1>Profile</h1>
        {data.me.profile.id ? <UpdateProfile /> : <CreateProfile />}
        <p>{data.me.profile.bio}</p>
        <p>{data.me.profile.location}</p>
        <p>{data.me.profile.website}</p>
      </div>
    </div>
  );
};

export default Profile;
