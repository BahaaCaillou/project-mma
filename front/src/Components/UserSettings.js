// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { auth } from '../auth/auth';

// const UserSettingsPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [id, setId] = useState('');
  
//     useEffect(() => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const id = user.id;
//       setId(id);
//     }, []);
  
//     const handleUpdate = async () => {
//       try {
//         const response = await axios.put(`${process.env.REACT_APP_API}/users/${id}/update`, { email, password }, { headers: auth() });
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     return (
//       <div className="page">
//         <h1>Paramètres du compte</h1>
//         <div className="user-settings">
//           <h3>Changer votre email et mot de passe</h3>
//           <label>
//             Email:
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </label>
//           <label>
//             Mot de passe:
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </label>
//           <button onClick={handleUpdate}>Mettre à jour</button>
//         </div>
//       </div>
//     );
//   };
  
//   export default UserSettingsPage;