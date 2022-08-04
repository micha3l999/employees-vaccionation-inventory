import React from 'react';
import PropTypes from 'prop-types';

export default function SelectSection({
  label,
  options,
  handleChange,
  inputName,
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={inputName}>
        {label}
        <div className="control mt-2">
          <div className="select">
            <select name={inputName} onChange={handleChange} required>
              <option value="">Select an option</option>
              {Object.keys(options).map((optKey) => (
                <option value={optKey}>{options[optKey]}</option>
              ))}
            </select>
          </div>
        </div>
      </label>
    </div>
  );
}

SelectSection.propTypes = {
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};
