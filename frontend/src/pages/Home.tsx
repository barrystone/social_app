import React from 'react';
import { gql, useQuery } from '@apollo/client';
import LeftNav from '../components/LeftNav';
import AllStorys from '../components/AllStorys';

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
              <h3 className="home__header-title">Home</h3>
              <h1>Storys</h1>
              <AllStorys />
            </div>
          </div>
        </div>
        <div className="right">right nav</div>
      </div>
    </>
  );
};

export default Home;
