import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import SocialAppLogo from '../assets/img/social_app-logo.png';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const initialValues: LoginValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invaild email address')
      .required('Email Required!'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Password Required!')
  });

  return (
    <div className="login-wrapper">
      <div className="login">
        <img src={SocialAppLogo} alt="logo" className="login-logo" />
        <h3>Login to Social_app </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (value, { setSubmitting }) => {
            setSubmitting(true);
            const response = await login({
              variables: value
            });

            localStorage.setItem('social_app-token', response.data.login.token);
            setSubmitting(false);
            history.push('/users');
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
            <button type="submit" className="authentication-form__button">
              <span>Login</span>
            </button>
          </Form>
        </Formik>
        <div className="login-register">
          <h4>Don't have an account ?</h4>
          <Link to="/signup" className="login-register__button">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
