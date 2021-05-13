import React, { useRef, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ME_QUERY } from '../pages/Profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { customModalStyles } from '../styles/ModalStyles';

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      id: $id
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
  id: Number;
  bio: string;
  location: string;
  website: string;
  avatar: string;
}

const UpdateProfile = () => {
  const inputFile = useRef(null);
  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  const { loading, data, error } = useQuery(ME_QUERY);
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    // Do refetch, when data update will sync to refetch latest updating.
    refetchQueries: [{ query: ME_QUERY }]
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialValues: ProfileValues = {
    id: data.me.profile.id,
    bio: data.me.profile.bio,
    location: data.me.profile.location,
    website: data.me.profile.website,
    avatar: data.me.profile.avatar
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const uploadImage = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'social_app');
    setImageLoading(true);
    const res = await fetch(
      process.env.REACT_APP_CLOUDINARY_ENDPOINT as string,
      {
        method: 'POST',
        body: data
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setImageLoading(false);
  };

  if (loading) return <h2>Loading......</h2>;
  if (error) return <h3>{error.message}</h3>;
  return (
    <div className="updateProfile-wrapper">
      <div className="updateProfile">
        <button onClick={openModal} className="profile-btn">
          Update Profile
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={customModalStyles}
        >
          <input
            className="profile-uploadImg"
            type="file"
            name="file"
            placeholder="upload image"
            ref={inputFile}
            onChange={uploadImage}
          />
          {imageLoading ? (
            <h3>Loading......</h3>
          ) : (
            <>
              {image ? (
                <span onClick={() => (inputFile as any).current.click()}>
                  <img src={image} alt="avatar" />
                </span>
              ) : data.me.profile.avatar ? (
                <span onClick={() => (inputFile as any).current.click()}>
                  <img src={data.me.profile.avatar} alt="avatar" />
                </span>
              ) : (
                <span onClick={() => (inputFile as any).current.click()}>
                  <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                </span>
              )}
            </>
          )}

          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={async (value, { setSubmitting }) => {
              setSubmitting(true);
              await updateProfile({
                variables: { ...value, avatar: image }
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
                <span>Update</span>
              </button>
            </Form>
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateProfile;
