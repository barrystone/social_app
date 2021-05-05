import React from 'react';
import { Link } from 'react-router-dom';

import SocialAppLogo from '../assets/img/social_app-logo.png';

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="landing">
        <div className="landing__left">
          <div className="landing-itemsbox">
            <div className="item">
              <span>
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
              <p>Follow your interests.</p>
            </div>

            <div className="item">
              <span>
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <p>Hear what people are talking about.</p>
            </div>

            <div className="item">
              <span>
                <i className="fa fa-comment" aria-hidden="true"></i>
              </span>
              <p> Join the conversation</p>
            </div>
          </div>
        </div>
        <div className="landing__center">
          <img src={SocialAppLogo} alt="logo" className="landing-logo" />
          <h1>
            See what's happening in
            <br />
            the world right now
          </h1>
          <span>Join Social_app Today.</span>
          <Link to="/signup" className="landing-signup">
            <span>Sign up</span>
          </Link>
          <Link to="/login" className="landing-login">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
