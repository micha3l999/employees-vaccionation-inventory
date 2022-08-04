import React, { useEffect, useState } from 'react';
import {
  API_URL,
  VACCINE_TYPES,
  VACCINATION_STATUS,
} from '../../util/constants';
import FilterOption from '../../components/FilterOption';
import UsersTable from '../../components/UsersTable';
import FilterContext from '../../context/FilterContext';
import './Filter.css';

export default function Filter() {
  const [users, setUsers] = useState([]);
  const [vaccinationStatus, setVaccinationStatus] = useState('');
  const [vaccineType, setVaccineType] = useState('');
  const [dateRange] = useState('');
  const [userDischarged, setUserDischarged] = useState('');

  const getUsers = async () => {
    try {
      const jsonResponse = await fetch(
        `${API_URL}/users?vaccinationStatus=${vaccinationStatus}&vaccineType=${vaccineType}&dateRange=${dateRange}`,
      );
      const response = await jsonResponse.json();
      if (response.success) {
        setUsers(response.body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dischargeUser = async (userIdentification) => {
    try {
      const jsonResponse = await fetch(
        `${API_URL}/users/discharge-patiente/${userIdentification}`,
        {
          method: 'PUT',
        },
      );
      const response = await jsonResponse.json();
      if (response.success) {
        setUserDischarged(userIdentification);
        alert(`User Email: ${response.body.email}\nPassword: ${response.body.password}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [vaccinationStatus, vaccineType, dateRange, userDischarged]);

  return (
    <div className="m-5 min-full">
      <FilterContext.Provider
        value={{
          dischargeUser,
        }}
      >
        <FilterOption
          title={vaccinationStatus}
          options={VACCINATION_STATUS}
          getUsersByFilter={(value) => setVaccinationStatus(value)}
        />
        <FilterOption
          title={vaccineType}
          options={VACCINE_TYPES}
          getUsersByFilter={(value) => setVaccineType(value)}
        />
        <FilterOption
          title={vaccinationStatus}
          options={VACCINATION_STATUS}
          getUsersByFilter={(value) => setVaccinationStatus(value)}
        />
        <div className="box my-5 min-full">
          <UsersTable users={users} />
        </div>
      </FilterContext.Provider>
    </div>
  );
}
