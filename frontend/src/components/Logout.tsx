import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Modal from 'react-modal';
import { useHistory } from 'react-router';
import { ME_QUERY } from '../pages/Profile';
import { logoutModelStyle } from '../styles/ModalStyles';

const Logout = () => {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { loading, error, data } = useQuery(ME_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem('social_app-token');
    history.push('/login');
  };

  return (
    <div className="logout">
      <span onClick={openModal} style={{ flex: 1, flexDirection: 'row' }}>
        <h4>
          {/* <img
            src={data.me.profile?.avatar}
            style={{ width: '40px', borderRadius: '50%' }}
            alt="avatar"
          /> */}
          {data.me.profile && data.me.profile.avatar ? (
            <img
              src={data.me.profile.avatar}
              style={{ width: '40px', borderRadius: '50%' }}
              alt="avatar"
            />
          ) : (
            <i
              className="fa fa-user fa-5x"
              aria-hidden="true"
              style={{ fontSize: '25px' }}
            ></i>
          )}
          <span style={{ marginLeft: '10px', marginTop: '-10px' }}>
            {data.me.name}
          </span>
          <span style={{ marginLeft: '30px' }}>
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </h4>
      </span>
      <div style={{ position: 'absolute', bottom: 0 }}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={logoutModelStyle}
          appElement={document.getElementById('root') as HTMLElement}
        >
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <p style={{ borderBottom: '1px solid black' }}>
              Log out @{data.me.name}
            </p>
          </span>
        </Modal>
      </div>
    </div>
  );
};

export default Logout;
