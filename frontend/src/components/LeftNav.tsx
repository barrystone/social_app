import React from 'react';
import { Link } from 'react-router-dom';
import SocialAppLogo from '../assets/img/social_app-logo.png';
import Logout from './Logout';
import Story from './Story';

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
      <a href="http://localhost:8080/">
        <h2>
          <i className="fa fa-envelope" aria-hidden="true" />{' '}
          <span className="title">ChatRoom</span>
        </h2>
      </a>

      {/* <Link to="/users">
        <h2>
          <i className="fa fa-bell" aria-hidden="true" />{' '}
          <span className="title">Notifications</span>
        </h2>
      </Link> */}
      {/* <Link to="/users">
        <h2>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />{' '}
          <span className="title">More</span>
        </h2>
      </Link> */}
      <Story />
      <Logout />
    </div>
  );
};

export default LeftNav;
