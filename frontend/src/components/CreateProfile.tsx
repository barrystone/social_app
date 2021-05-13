import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ME_QUERY } from '../pages/Profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { customModalStyles } from '../styles/ModalStyles';

const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

interface ProfileValues {
  bio: string;
  location: string;
  website: string;
  avatar: string;
}

const CreateProfile = () => {
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialValues: ProfileValues = {
    bio: '',
    location: '',
    website: '',
    avatar: ''
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="createProfile-wrapper">
      <div className="createProfile">
        <button onClick={openModal} className="profile-btn">
          Create Profile
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={customModalStyles}
        >
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={async (value, { setSubmitting }) => {
              setSubmitting(true);
              await createProfile({
                variables: value
              });

              setSubmitting(false);
              setModalIsOpen(false);
            }}
          >
            <Form className="normal-form">
              <Field
                name="bio"
                type="text"
                as="textarea"
                placeholder="Bio"
                className="normal-form__field"
              />
              <ErrorMessage
                name="bio"
                component={'div'}
                className="normal-form__error"
              />
              <Field
                name="location"
                type="location"
                placeholder="Location"
                className="normal-form__field"
              />
              <ErrorMessage
                name="location"
                component={'div'}
                className="normal-form__error"
              />
              <Field
                name="website"
                type="website"
                placeholder="Website"
                className="normal-form__field"
              />
              <ErrorMessage
                name="website"
                component={'div'}
                className="normal-form__error"
              />
              <button type="submit" className="normal-form__button">
                <span>Create</span>
              </button>
            </Form>
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default CreateProfile;
