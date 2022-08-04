import React, { useState } from 'react';
import FormSection from '../../components/FormSection';
import { API_URL } from '../../util/constants';
import { validateEmail, validateIdentification } from '../../util/functions';
import './Create.css';

export default function CreateUser() {
  const [newUserCredentials, setNewUserCredentials] = useState({
    identification: '',
    name: '',
    lastName: '',
    email: '',
  });

  /* Errors in the input indicated */
  const [formErrors, setFormErrors] = useState({
    identification: '',
    name: '',
    lastName: '',
    email: '',
  });

  /* Message to shown when the user is created */
  const [creationMsg, setCreationMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== '' || value !== undefined) {
      setFormErrors({ ...formErrors, [name]: '' });
    }

    setNewUserCredentials({ ...newUserCredentials, [name]: value });
  };

  const validateInputs = () => {
    /* If fields are empty, show an error in the input and don't create a new user */
    if (!newUserCredentials.identification || !newUserCredentials.name
      || !newUserCredentials.lastName || !newUserCredentials.email) {
      setFormErrors({
        identification: newUserCredentials.identification.length > 0 ? '' : 'This field is required',
        name: newUserCredentials.name.length > 0 ? '' : 'This field is required',
        lastName: newUserCredentials.lastName.length > 0 ? '' : 'This field is required',
        email: newUserCredentials.email.length > 0 ? '' : 'This field is required',
      });
      return false;
    }
    if (!validateIdentification(newUserCredentials.identification)) {
      setFormErrors({
        ...formErrors,
        identification: 'The identification is invalid',
      });
      return false;
    }

    if (!validateEmail(newUserCredentials.email)) {
      setFormErrors({
        ...formErrors,
        email: 'The email is invalid',
      });
      return false;
    }
    return true;
  };

  const createUser = async (url) => {
    try {
      const jsonResponse = await fetch(`${API_URL}/users${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identification: newUserCredentials.identification,
          name: newUserCredentials.name,
          lastName: newUserCredentials.lastName,
          email: newUserCredentials.email,
        }),
      });
      const response = await jsonResponse.json();
      return response;
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      return { success: false, msg: 'There was an error' };
    }
  };

  const onCreateUser = async () => {
    /* Check if there's an error in the inputs, if so exit the user creation */
    const formValidation = validateInputs();
    if (!formValidation) {
      return false;
    }
    const response = await createUser('/');
    /* If the response is true, show a msg to indicate that the user is created */
    if (response.success) {
      setCreationMsg('User Created!');
    } else {
      setCreationMsg(response.msg);
    }
    setTimeout(() => {
      setCreationMsg('');
    }, 3000);

    return true;
  };

  const onCreateAndDischargeUser = async () => {
    /* Check if there's an error in the inputs, if so exit the user creation */
    const formValidation = validateInputs();
    if (!formValidation) {
      return false;
    }
    const response = await createUser('/discharge-patiente/');
    /* If the response is true, show a msg to indicate that the user is created */
    if (response.success) {
      setCreationMsg('User Created!');
      alert(`User Email: ${response.body.email}\nPassword: ${response.body.password}`);
    } else {
      setCreationMsg(response.msg);
    }
    setTimeout(() => {
      setCreationMsg('');
    }, 3000);
    return true;
  };

  return (
    <div className="container">
      <p className="is-size-3 has-text-black mx-5">Create New User</p>
      <div className="columns">
        <div className="box column is-half my-5">
          <div className="p-5">
            <form>
              <div className="block">
                <FormSection
                  error={formErrors.identification}
                  value={newUserCredentials.identification}
                  inputName="identification"
                  handleChange={handleChange}
                  inputType="text"
                  label="Identification"
                />
              </div>
              <div className="block">
                <FormSection
                  error={formErrors.name}
                  value={newUserCredentials.name}
                  inputName="name"
                  handleChange={handleChange}
                  inputType="text"
                  label="Name"
                />
              </div>
              <div className="block">
                <FormSection
                  error={formErrors.lastName}
                  value={newUserCredentials.lastName}
                  inputName="lastName"
                  handleChange={handleChange}
                  inputType="text"
                  label="Last Name"
                />
              </div>
              <div className="block">
                <FormSection
                  error={formErrors.email}
                  value={newUserCredentials.email}
                  inputName="email"
                  handleChange={handleChange}
                  inputType="email"
                  label="Email"
                />
              </div>
              <div className="buttons">
                <button className="button" type="button" onClick={onCreateUser}>Create</button>
                <button className="button is-primary" type="button" onClick={onCreateAndDischargeUser}>Discharge patiente</button>
                <span>{creationMsg}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
