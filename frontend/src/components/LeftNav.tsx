import React from 'react';
import { Link } from 'react-router-dom';
import SocialAppLogo from '../assets/img/social_app-logo.png';

const LeftNav = () => {
  return (
    <div className="leftNav">
      <Link to="/">
        <img src={SocialAppLogo} alt="logo" className="logo" />
      </Link>
      <Link to="/">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />{' '}
          <span className="title">Home</span>
        </h2>
      </Link>
      <Link to="/profile">
        <h2>
          <i className="fa fa-user" aria-hidden="true" />{' '}
          <span className="title">Profile</span>
        </h2>
      </Link>
      <Link to="/users">
        <h2>
          <i className="fa fa-envelope" aria-hidden="true" />{' '}
          <span className="title">Messages</span>
        </h2>
      </Link>
      <Link to="/users">
        <h2>
          <i className="fa fa-bell" aria-hidden="true" />{' '}
          <span className="title">Notifications</span>
        </h2>
      </Link>
      <Link to="/users">
        <h2>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />{' '}
          <span className="title">More</span>
        </h2>
      </Link>
      <button className="leftNav-btn">
        <span>Story</span>
      </button>
    </div>
  );
};

export default LeftNav;
