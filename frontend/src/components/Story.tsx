import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { ME_QUERY } from '../pages/Profile';
import { customModalStyles } from '../styles/ModalStyles';

const CREATE_STORT_MUTATION = gql`
  mutation createStory($content: String) {
    createStory(content: $content) {
      id
    }
  }
`;

interface StoryValues {
  content: string;
}

const Story = () => {
  const [createStory] = useMutation(CREATE_STORT_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, 'Must be more than 1 character')
      .max(256, 'Must be equal or less than 256 characters')
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const initialValues: StoryValues = {
    content: ''
  };

  return (
    <div className="story-wrapper">
      <div className="story">
        <button onClick={openModal} className="story-btn">
          <span>Story</span>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={customModalStyles}
          appElement={document.getElementById('root') as HTMLElement}
        >
          <span className="exit" onClick={closeModal}>
            <i
              className="fa fa-times"
              // aria-hidden="true"
            ></i>
          </span>
          <div className="header"></div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (value, { setSubmitting }) => {
              setSubmitting(true);
              await createStory({
                variables: value
              });

              setSubmitting(false);
              setModalIsOpen(false);
            }}
          >
            <Form className="normal-form">
              <Field
                name="content"
                type="text"
                as="textarea"
                placeholder="What's your story..."
                className="normal-form__field"
              />
              <ErrorMessage
                name="content"
                component={'div'}
                className="normal-form__error"
              />

              <div className="footer"></div>
              <button type="submit" className="normal-form__button">
                <span>Story</span>
              </button>
            </Form>
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default Story;
