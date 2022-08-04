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
import FilterCalendar from '../../components/FilterCalendar';

export default function Filter() {
  const [users, setUsers] = useState([]);
  const [vaccinationStatus, setVaccinationStatus] = useState('');
  const [vaccineType, setVaccineType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userDischarged, setUserDischarged] = useState('');

  const getUsers = async () => {
    try {
      const jsonResponse = await fetch(
        `${API_URL}/users?vaccinationStatus=${vaccinationStatus}&vaccineType=${vaccineType}&startDate=${startDate}&endDate=${endDate}`,
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
        alert(
          `User Email: ${response.body.email}\nPassword: ${response.body.password}`,
        );
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
  }, [vaccinationStatus, vaccineType, startDate, endDate, userDischarged]);

  return (
    <div className="m-5 min-full">
      <FilterContext.Provider
        value={{
          dischargeUser,
        }}
      >
        <div className="field is-grouped center">
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
          <span className="mx-2 has-text-centered">From: </span>
          <FilterCalendar
            inputName="startDate"
            handleChange={(value) => setStartDate(value)}
          />
          <span className="mx-2 has-text-centered">To: </span>
          <FilterCalendar
            inputName="endDate"
            handleChange={(value) => setEndDate(value)}
          />
        </div>
        <div className="box my-5 min-full">
          <UsersTable users={users} />
        </div>
      </FilterContext.Provider>
    </div>
  );
}
