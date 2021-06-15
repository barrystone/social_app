import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import SocialAppLogo from '../assets/img/social_app-logo.png';

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
  const [signup] = useMutation(SIGNUP_MUTATION);

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
    <div className="signup-wrapper">
      <div className="signup">
        <img src={SocialAppLogo} alt="logo" className="signup-logo" />
        <h3>Sign up</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (value, { setSubmitting }) => {
            setSubmitting(true);
            const response = await signup({
              variables: value
            });

            localStorage.setItem(
              'social_app-token',
              response.data.signup.token
            );
            setSubmitting(false);
            history.push('/');
          }}
        >
          <Form className="authentication-form">
            <Field
              name="email"
              type="text"
              placeholder="Email"
              className="authentication-form__field"
            />
            <ErrorMessage
              name="email"
              component={'div'}
              className="authentication-form__error"
            />
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="authentication-form__field"
            />
            <ErrorMessage
              name="name"
              component={'div'}
              className="authentication-form__error"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="authentication-form__field"
            />
            <ErrorMessage
              name="password"
              component={'div'}
              className="authentication-form__error"
            />
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="authentication-form__field"
            />
            <ErrorMessage
              name="confirmPassword"
              component={'div'}
              className="authentication-form__error"
            />
            <button type="submit" className="authentication-form__button">
              Sign up
            </button>
          </Form>
        </Formik>
        <div className="signup-login">
          <h4>Alredy have an account ?</h4>
          <Link to="/login" className="signup-login__button">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
