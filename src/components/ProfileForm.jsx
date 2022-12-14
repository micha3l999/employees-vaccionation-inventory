import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { API_URL, VACCINATION_STATUS, VACCINE_TYPES } from '../util/constants';
import CheckboxSection from './CheckboxSection';
import FormSection from './FormSection';
import SelectSection from './SelectSection';

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
    setInterval(() => {
      setCreationMsg('');
    }, 3000);
  };

  const handleChangeCheckbox = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setProfile({ ...profile, [name]: 'VACCINATED' });
    } else {
      setProfile({ ...profile, [name]: 'NO_VACCINATED' });
    }
    console.log(event.target.name);
  };

  const handleChangeSelect = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

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
      <SelectSection
        handleChange={handleChangeSelect}
        label="Vaccine Type"
        inputName="vaccineType"
        options={VACCINE_TYPES}
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
      <CheckboxSection
        value={VACCINATION_STATUS.VACCINATED}
        handleChange={handleChangeCheckbox}
        inputName="vaccinationStatus"
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
