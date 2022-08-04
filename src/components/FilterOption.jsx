import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function FilterOption({ title = '', options = {}, getUsersByFilter }) {
  const onClick = (event) => {
    const option = event.target.id;
    console.log(option);
    if (option === 'SELECT') {
      getUsersByFilter('');
    } else {
      getUsersByFilter(event.target.id);
    }
  };

  return (
    <div className="dropdown is-hoverable mx-2">
      <div className="dropdown-trigger">
        <button
          className="button"
          type="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{title.length < 1 ? 'Select' : options[title]}</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={faAngleDown} aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a
            id="SELECT"
            className="dropdown-item"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onClick}
          >
            Select
          </a>
          {Object.keys(options).map((optionKey) => (
            <a
              id={optionKey}
              className="dropdown-item"
              tabIndex={0}
              role="button"
              onClick={onClick}
              onKeyDown={onClick}
              key={`${optionKey}`}
            >
              {options[optionKey]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

FilterOption.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  getUsersByFilter: PropTypes.func.isRequired,
};
