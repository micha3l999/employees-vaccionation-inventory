import React from 'react';
import PropTypes from 'prop-types';

export default function CheckboxSection({ value, inputName, handleChange }) {
  return (
    <div className="field">
      <div className="control mt-2">
        <input name={inputName} type="checkbox" onChange={handleChange} />
        <label className="checkbox px-2" htmlFor={inputName}>
          {value}
        </label>
      </div>
    </div>
  );
}

CheckboxSection.propTypes = {
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
