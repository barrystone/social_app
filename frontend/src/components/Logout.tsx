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
      <div className="logout__container" onClick={openModal}>
        <h4>
          {data.me.profile && data.me.profile.avatar ? (
            <img src={data.me.profile?.avatar} alt="avatar" />
          ) : (
            <i className="fa fa-user fa-5x" aria-hidden="true"></i>
          )}
          <span className="logout-name">{data.me.name}</span>
          <span className="logout-icon">
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </h4>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={logoutModelStyle}
          appElement={document.getElementById('root') as HTMLElement}
        >
          <span onClick={handleLogout} className="logout__modal-span">
            <p>Log out @{data.me.name}</p>
          </span>
        </Modal>
      </div>
    </div>
  );
};

export default Logout;
