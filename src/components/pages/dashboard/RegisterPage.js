import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../../context/appContext';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../../assets/wrappers/RegisterPage';

import { Logo, FormRow, Alert } from '../../../components';

const initialState = {
  name: '',
  name: '',
  email: '',
  password: '',
  location: '',
  isLogin: true,
  role: ['user'],
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({
      name: '',
      username: '',
      email: '',
      password: '',
      location: '',
      role: ['user'],
      isLogin: !values.isLogin,
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, username, email, password, isLogin, role, location } = values;

    if (
      !username ||
      !password ||
      (!isLogin && !name) ||
      (!isLogin && !email)
    ) {
      displayAlert();
      return;
    }

    if (isLogin) {
      const currentUser = { username, password };
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      });
    } else {
      const currentUser = { name, username, email, password, role, location };
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isLogin ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        <FormRow
          type="text"
          name="username"
          label="User Name"
          value={values.username}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          label="Password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isLogin && (
          <FormRow
            type="text"
            name="name"
            label="Full Name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {!values.isLogin && (
          <FormRow
            type="email"
            name="email"
            label="Email"
            value={values.email}
            handleChange={handleChange}
          />
        )}

        {!values.isLogin && (
          <FormRow
            type="text"
            name="location"
            label="location"
            value={values.location}
            handleChange={handleChange}
          />
        )}
        <button type="submit" className="btn-common btn-block" disabled={isLoading}>
          {values.isLogin ? 'Login' : 'Register'}
        </button>
        <p>
          {values.isLogin ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default RegisterPage;
