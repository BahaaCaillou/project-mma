import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../auth/auth';

function UserRole({ user }) {
  const [role, setRole] = useState(user.role);

  const handleChange = (event) => {
    setRole(event.target.value);
    axios.put(`${process.env.REACT_APP_API}/users/${user._id}/role`, { role: event.target.value }, { headers: auth() })
      .then(res => {
        console.log(res.data);
      });
  };

  return (
    <div>
          <label htmlFor="role" style={{margin: 1 + 'em'}}>Rôle</label>
      <select value={role} onChange={handleChange}>
        <option value="Utilisateur">Utilisateur</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  );
}

export default UserRole;