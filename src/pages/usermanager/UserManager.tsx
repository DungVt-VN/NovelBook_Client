import React, { useEffect, useState } from 'react';
import './UserManager.scss'; // Import file SCSS của bạn
import User from '../../services/models/User'
import { getAllUsers } from '../../services/api/userService';
import useAuth from '../../hooks/useAuth';


const UserManager = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (token) {
          const usersData = await getAllUsers(token);
          setUsers(usersData); // Set usersData to state
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditUser(userToEdit);
    }
  };

  const handleDelete = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const EditUserForm = ({ user }: { user: User }) => {
    const [formValues, setFormValues] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues(prev => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const updatedUsers = users.map(u => (u.id === user.id ? formValues : u));
      setUsers(updatedUsers);
      setEditUser(null);
    };

    return (
      <div className="edit-user-form">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="userName" value={formValues.userName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formValues.email} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            Roles:
            <input type="text" name="roles" value={formValues.roles.join(', ')} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };

  return (
    <div className="user-manager">
      <h1>User Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Email Confirmed</th>
            <th>Phone Number</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.emailConfirmed ? 'Yes' : 'No'}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.roles.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && <EditUserForm user={editUser} />}
    </div>
  );
};

export default UserManager;
