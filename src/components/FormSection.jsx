import React from 'react';
import PropTypes from 'prop-types';

export default function FormSection({
  inputName,
  handleChange,
  inputType,
  label,
  value,
  error,
}) {
  const onChange = (e) => {
    handleChange(e);
  };

  return (
    <div className="field">
      <label htmlFor={inputName} className="label">
        {label}
        <div className="control mt-2">
          <input
            title={error}
            className={`input ${error.length < 1 ? '' : 'is-danger'}`}
            type={inputType}
            placeholder={label}
            name={inputName}
            value={value}
            onChange={onChange}
            required
          />
        </div>
      </label>
    </div>
  );
}

FormSection.defaultProps = {
  error: '',
};

FormSection.propTypes = {
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
};
