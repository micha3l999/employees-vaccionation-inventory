import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { API_URL } from '../util/constants';
import FormSection from './FormSection';

export default function ProfileForm() {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });
  /* Errors in the input indicated */
  const [formErrors, setFormErrors] = useState({
    birthDate: '',
    address: '',
    phone: '',
    vaccinationStatus: '',
    vaccineType: '',
    vaccinationDate: '',
    dosesNumber: '',
  });

  /* Message to shown when the user is created */
  const [creationMsg, setCreationMsg] = useState('');

  /* Handle the change of input values by the name and the value */
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== '' || value !== undefined) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    setProfile({ ...profile, [name]: value });
  };

  const updateUser = async () => {
    try {
      const jsonResponse = await fetch(`${API_URL}/users/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, ...profile }),
      });
      const response = await jsonResponse.json();
      return response;
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      return { success: false, msg: 'There was an error' };
    }
  };

  const handleUpdate = async () => {
    const response = await updateUser();
    if (response.success) {
      setCreationMsg('User updated');
      setUser(response.body);
    } else {
      setCreationMsg(response.msg);
    }
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <FormSection
        error={formErrors.birthDate}
        value={profile.birthDate}
        inputType="date"
        inputName="birthDate"
        handleChange={handleChange}
        label="Birth Date"
      />
      <FormSection
        error={formErrors.address}
        value={profile.address}
        inputType="text"
        inputName="address"
        handleChange={handleChange}
        label="Address"
      />
      <FormSection
        error={formErrors.phone}
        value={profile.phone}
        inputType="number"
        inputName="phone"
        handleChange={handleChange}
        label="Mobile Number"
      />
      <FormSection
        error={formErrors.vaccinationStatus}
        value={profile.vaccinationStatus}
        inputType="text"
        inputName="vaccinationStatus"
        handleChange={handleChange}
        label="Vaccination Status"
      />
      <FormSection
        error={formErrors.vaccineType}
        value={profile.vaccineType}
        inputType="text"
        inputName="vaccineType"
        handleChange={handleChange}
        label="Vaccine Type"
      />
      <FormSection
        error={formErrors.vaccinationDate}
        value={profile.vaccinationDate}
        inputType="date"
        inputName="vaccinationDate"
        handleChange={handleChange}
        label="Vaccination Date"
      />
      <FormSection
        error={formErrors.dosesNumber}
        value={profile.dosesNumber}
        inputType="number"
        inputName="dosesNumber"
        handleChange={handleChange}
        label="Doses Number"
      />
      <div className="buttons">
        <button className="button" type="button" onClick={handleUpdate}>
          Update profile
        </button>
        <span>{creationMsg}</span>
      </div>
    </>
  );
}
