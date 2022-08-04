import React from 'react';
import PropTypes from 'prop-types';

export default function CheckboxSection({
  value,
  inputName,
  handleChange,
}) {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox" htmlFor={inputName}>
          <input
            name={inputName}
            type="checkbox"
            onChange={handleChange}
          />
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
