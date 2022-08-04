import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

export default function UsersTable({ users }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Identification</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(users).map((user) => (
          <TableRow key={user.identification} user={user} />
        ))}
      </tbody>
    </table>
  );
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  ).isRequired,
};
