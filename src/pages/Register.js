import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';

const initialState = {
  fullName: '',
  name: '',
  email: '',
  password: '',
  isLogin: true,
  role: ['user'],
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({
      fullName: '',
      username: '',
      email: '',
      password: '',
      role: ['user'],
      isLogin: !values.isLogin,
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, username, email, password, isLogin, role } = values;

    if (
      !username ||
      !password ||
      (!isLogin && !fullName) ||
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
      const currentUser = { fullName, username, email, password, role };
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

        {!values.isLogin && (
          <FormRow
            type="text"
            name="fullName"
            label="Full Name"
            value={values.fullName}
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
        <button type="submit" className="btn btn-block" disabled={isLoading}>
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
export default Register;
