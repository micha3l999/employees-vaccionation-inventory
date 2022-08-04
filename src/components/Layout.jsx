import React, { useContext, useState } from 'react';
import {
  Link, Outlet, useNavigate, Navigate,
} from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Layout() {
  const [isActiveMobile, setIsActiveMobile] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const onClick = () => {
    setIsActiveMobile(!isActiveMobile);
  };

  const onLogOut = () => {
    navigate('/');
  };

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div className="row">
        <div className="columns is-mobile">
          <div className="column">
            <nav
              className="navbar has-shadow"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <a
                  className="navbar-item"
                  href="https://krugercorp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/kruger_logo.png"
                    alt="company logo"
                    width="100"
                    height="35"
                  />
                </a>
                <button
                  onClick={onClick}
                  type="button"
                  tabIndex={0}
                  className="navbar-burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarMenu"
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </button>
              </div>
              <div
                id="navbarMenu"
                className={`navbar-menu ${isActiveMobile ? 'is-active' : ''}`}
              >
                <div className="navbar-start">
                  {user.role === 'ADMIN' && (
                    <Link className="navbar-item" to="/create">
                      Create User
                    </Link>
                  )}

                  {user.role === 'ADMIN' && (
                    <Link className="navbar-item" to="/filter">
                      Filter users
                    </Link>
                  )}

                  <Link className="navbar-item" to="/profile">
                    Profile
                  </Link>
                </div>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <button
                      type="button"
                      className="button is-light"
                      onClick={onLogOut}
                    >
                      <strong>Log out</strong>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
