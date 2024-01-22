import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "../auth/auth";
import UserRole from "../Components/UserRole";


const AllUser = () => {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/users`, {headers: auth()})
        .then(res => {
            setUsers(res.data)
            console.log(res.data)
        })
    },[])

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API}/users/${id}`, { headers: auth() })
          .then(() => {
            // Remove the user from the state
            setUsers(users.filter(user => user._id !== id));
          })
          .catch(err => {
            console.error(err);
          });
      };



    return (
            <div className="user-table-container">
        <table className="user-table">
        <thead>
          <tr>
            <th scope="col" className="user-table-header">Login</th>
            <th scope="col" className="user-table-header">Email</th>
            <th scope="col" className="user-table-header">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="user-table-row">
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td><UserRole user={user} className="user-role-select" /></td>
              <td>
              <button onClick={() => handleDelete(user._id)} className="delete-button" aria-label={`Supprimer l'utilisateur ${user.login}`}>Supprimer</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
};

export default AllUser;