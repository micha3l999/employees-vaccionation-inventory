import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/" />;
}
