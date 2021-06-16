import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ALLSTORYS_QUERRY } from './AllStorys';

const CREATE_STORY_MUTATION = gql`
  mutation createStory($content: String) {
    createStory(content: $content) {
      id
    }
  }
`;

interface StoryValues {
  content: string;
}

const Storying = () => {
  const [createStory] = useMutation(CREATE_STORY_MUTATION, {
    refetchQueries: [{ query: ALLSTORYS_QUERRY }]
  });

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, 'Must be more than 1 character')
      .max(256, 'Must be equal or less than 256 characters')
  });

  const initialValues: StoryValues = {
    content: ''
  };

  return (
    <div className="storying-wrapper">
      <div className="storying">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (value, { setSubmitting }) => {
            setSubmitting(true);
            await createStory({
              variables: value
            });
            setSubmitting(false);
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

            <button type="submit" className="normal-form__button storying-btn">
              <span>Storying</span>
            </button>
          </Form>
        </Formik>
        <div className="storying-footer" />
      </div>
    </div>
  );
};

export default Storying;
