import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FilterContext from '../context/FilterContext';

export default function TableRow({ user }) {
  const filterContext = useContext(FilterContext);

  const handleClick = () => {
    const userId = user.identification;
    filterContext.dischargeUser(userId);
  };

  return (
    <tr>
      <td>{user.identification}</td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      {!user.dischargedPatiente && (
        <td>
          <button className="button mx-5" type="button" onClick={handleClick}>
            Discharge patiente
          </button>
        </td>
      )}
    </tr>
  );
}

TableRow.propTypes = {
  user: PropTypes.shape({
    identification: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};
