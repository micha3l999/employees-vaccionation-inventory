import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSection from './FormSection';

import { API_URL } from '../util/constants';
import { validateEmail } from '../util/functions';
import UserContext from '../context/UserContext';

export default function LoginForm() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  /* Errors in the input indicated */
  const [formErrors, setFormErrors] = useState({
    password: '',
    email: '',
  });

  /* Handle the change of input values by the name and the value */
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== '' || value !== undefined) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const validateInputs = () => {
    /* If fields are empty, show an error in the input and don't create a new user */
    if (!loginCredentials.email || !loginCredentials.password) {
      setFormErrors({
        email: loginCredentials.email.length > 0 ? '' : 'This field is required',
        password: loginCredentials.password.length > 0 ? '' : 'This field is required',
      });
      return false;
    }

    if (!validateEmail(loginCredentials.email)) {
      setFormErrors({
        ...formErrors,
        email: 'The email is invalid',
      });
      return false;
    }
    return true;
  };

  const customNavigate = (user) => {
    setUser(user);
    if (user.role === 'ADMIN') {
      navigate('/create');
    } else {
      navigate('/profile');
    }
  };

  const handleLoginClick = async () => {
    if (!validateInputs()) {
      return false;
    }
    try {
      const jsonResponse = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginCredentials.email,
          password: loginCredentials.password,
        }),
      });
      const response = await jsonResponse.json();
      if (response.success) {
        customNavigate(response.body);
      } else {
        setErrorMsg(response.msg);
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    return true;
  };

  return (
    <div className="container is-fluid py-4">
      <p className="is-size-3 has-text-centered">Login</p>
      <FormSection error={formErrors.email} value={loginCredentials.email} inputType="email" inputName="email" handleChange={handleChange} label="Email" />
      <FormSection error={formErrors.password} value={loginCredentials.password} inputType="password" inputName="password" handleChange={handleChange} label="Password" />
      {errorMsg && <span>{errorMsg}</span>}
      <div className="field">
        <div className="control mt-5">
          <button id="submitButton" className="button" type="button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
