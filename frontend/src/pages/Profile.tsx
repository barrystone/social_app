import React from 'react';
import { gql, useQuery } from '@apollo/client';
import CreateProfile from '../components/CreateProfile';
import UpdateProfile from '../components/UpdateProfile';
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

const Profile = () => {
  const { loading, data, error } = useQuery(ME_QUERY);
  const history = useHistory();

  if (loading) return <h2>Loading......</h2>;
  if (error) return <h3>{error.message}</h3>;
  return (
    <>
      <div className="main-layout">
        <div className="left">
          <LeftNav />
        </div>
        <div className="profile-wrapper">
          <div className="profile">
            <div className="profile__top">
              <div
                className="profile__top-backArrow"
                onClick={() => history.goBack()}
              >
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </div>
              <div className="profile__top-name">
                <span>{data.me.name}</span>
              </div>
            </div>

            <div className="profile__avatar">
              {data.me.profile.avatar ? (
                <img src={data.me.profile.avatar} alt="avatar" />
              ) : (
                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
              )}
            </div>

            <h3>{data.me.name}</h3>

            <div className="profile__changeProfile">
              {data.me.profile ? <UpdateProfile /> : <CreateProfile />}
            </div>

            <p>{data.me.profile.bio}</p>

            <div className="profile__website">
              {data.me.profile ? (
                <p>
                  <i className="fas fa-link"> </i>{' '}
                  <Link
                    to={{ pathname: data.me.profile.website }}
                    target="_blank"
                  >
                    {data.me.profile.website}
                  </Link>
                </p>
              ) : null}
            </div>

            <div className="profile__followers">
              <p>13 following</p>
              <p>999 followers</p>
            </div>
          </div>
        </div>
        <div className="right">right nav</div>
      </div>
    </>
  );
};

export default Profile;
