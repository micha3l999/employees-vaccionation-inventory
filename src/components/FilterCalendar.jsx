import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function FilterCalendar({ inputName, handleChange }) {
  const [date, setDate] = useState('');

  const onChange = (event) => {
    const { value } = event.target;
    setDate(value);
    handleChange(value);
  };

  return (
    <div className="control">
      <input
        className="input"
        value={date}
        type="date"
        name={inputName}
        onChange={onChange}
      />
    </div>
  );
}

FilterCalendar.propTypes = {
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
