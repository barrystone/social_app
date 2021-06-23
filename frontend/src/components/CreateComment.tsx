import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { ME_QUERY } from '../pages/Profile';
import { customModalStyles } from '../styles/ModalStyles';
// import '../assets/css/tweet.css';

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($content: String!, $id: Int!) {
    createComment(content: $content, id: $id) {
      id
    }
  }
`;

interface CommentProps {
  content: string;
}
interface Props {
  story: string;
  name: string;
  avatar: string;
  id: number;
}

export default function CreateComment({ story, avatar, name, id }: Props) {
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const initialValues: CommentProps = {
    content: ''
  };

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, 'Must be more than 1 character')
      .max(256, 'Must be less than 257 characters')
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <span onClick={openModal}>
        <i className="far fa-comment" aria-hidden="true" />
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customModalStyles}
      >
        <span className="exit" onClick={closeModal}>
          <i className="fa fa-times" aria-hidden="true" />
        </span>
        <div className="header" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 8fr',
            marginTop: '10px'
          }}
        >
          {!avatar ? (
            <img
              src={avatar}
              style={{ width: '40px', borderRadius: '50%' }}
              alt="avatar"
            />
          ) : (
            <span>
              <i
                className="fa fa-user fa-5x"
                aria-hidden="true"
                style={{ fontSize: '35px' }}
              ></i>
            </span>
          )}
          <h5>{name}</h5>
        </div>
        <p
          style={{
            marginLeft: '20px',
            borderLeft: '1px solid var(--accent)',
            paddingLeft: '20px',
            height: '50px',
            marginTop: 0
          }}
        >
          {story}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await createComment({
              variables: { ...values, id }
            });

            setSubmitting(false);
            setIsOpen(false);
          }}
        >
          <Form className="normal-form">
            {data.me.profile && data.me.profile.avatar ? (
              <img
                src={data.me.profile?.avatar}
                style={{ width: '40px', borderRadius: '50%' }}
                alt="avatar"
              />
            ) : (
              <span>
                <i
                  className="fa fa-user fa-5x"
                  aria-hidden="true"
                  style={{ fontSize: '25px' }}
                ></i>
              </span>
            )}
            <Field
              name="content"
              type="text"
              as="textarea"
              placeholder="Tweet your reply..."
              className="normal-form__field"
            />
            <ErrorMessage
              name="content"
              component={'div'}
              className="normal-form__field"
            />

            <div className="footer" />
            <button type="submit" className="normal-form__button">
              <span>Reply</span>
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
