import React from 'react';
import ProfileForm from '../../components/ProfileForm';

export default function Profile() {
  return (
    <div className="container">
      <div className="container">
        <p className="is-size-3 has-text-black mx-5">My profile</p>
        <div className="columns">
          <div className="box column is-half my-5">
            <div className="p-5">
              <form>
                <ProfileForm />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
