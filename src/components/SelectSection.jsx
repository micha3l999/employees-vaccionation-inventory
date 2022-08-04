import React from 'react';

export default function SelectSection() {
  return (
    <div className="field">
      <div className="control">
        <div className="select">
          <label className="label" htmlFor="selectList">
            Subject
            <select id="selectList" aria-label="Mute volume">
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
