import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const history = useHistory();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);

  const initialValues: SignupValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Name Required!'),

    email: Yup.string()
      .email('Invaild email address')
      .required('Email Required!'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Password Required!'),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match!'
    )
  });

  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: value
          });

          localStorage.setItem('social_app-token', response.data.signup.token);
          setSubmitting(false);
          history.push('/users');
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={'div'} />
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component={'div'} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={'div'} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={'div'} />
          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
