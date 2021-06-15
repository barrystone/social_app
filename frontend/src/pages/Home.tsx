import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import LeftNav from '../components/LeftNav';

export const ME_QUERY = gql`
  {
    me {
      id
      name
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

const Home = () => {
  const { loading, data, error } = useQuery(ME_QUERY);
  const history = useHistory();
  // data.me.profile as ProfileData;

  if (loading) return <h2>Loading......</h2>;
  if (error) return <h3>{error.message}</h3>;
  return (
    <>
      <div className="main-layout">
        <div className="left">
          <LeftNav />
        </div>
        <div className="home-wrapper">
          <div className="home">
            <div className="home__header">
              <h1>Storys</h1>
              <h3 className="home-title">Home</h3>
            </div>
          </div>
        </div>
        <div className="right">right nav</div>
      </div>
    </>
  );
};

export default Home;
