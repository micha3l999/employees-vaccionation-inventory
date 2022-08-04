import React from 'react';
import LoginForm from '../../components/LoginForm';
import './Login.css';

export default function Login() {
  return (
    <div className="full-height">
      <div className="container full-height">
        <div className="columns full-height is-vcentered">
          <div className="column has-text-centered">
            <img src="kruger_logo.png" alt="company logo" />
          </div>
          <div className="column box">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
