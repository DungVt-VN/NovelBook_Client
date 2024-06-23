// UserManager.tsx

import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './UserManager.scss'; // Import file SCSS của bạn
import User from '../../services/models/User'; // Import User model từ services
import useAuth from '../../hooks/useAuth';
import EditUser from '../../components/edituser/EditUser';
import UserTable from '../../components/usertable/UserTable'; // Import UserTable component

const USER_MANAGER_URL = "http://localhost:5167/admin/users";

const UserManager = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loadAgain, setLoadAgain] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USER_MANAGER_URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
    setLoadAgain("");
  }, [loadAgain, token]);

  const handleCancel = () => {
    setEditUser(null);
  }

  const handleSubmitEdit = () => {
    setLoadAgain("1");
    setEditUser(null);
  };

  const handleEdit = (userId: string) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditUser(userToEdit);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`${USER_MANAGER_URL}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: userId,
        });
        window.alert(response.data);
        setLoadAgain("1");
      } catch (error) {
        window.alert("Can't delete user!");
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleConfirmEmail = async (email: string) => {
    if (window.confirm(`Are you sure you want to confirm email: ${email}?`)) {
      try {
        const response = await axios.put(`${USER_MANAGER_URL}/confirm`,
          {
            email: email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
        window.alert(response.data);
        setLoadAgain("1");
      } catch (error) {
        console.error('Error confirming user:', error);
      }
    }
  };

  return (
    <Fragment>
      <div className="user-manager">
        <h1>User Management</h1>
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onConfirmEmail={handleConfirmEmail}
        />
      </div>
      {editUser && (
        <div className="overlay">
          <div className="form-container">
            <EditUser user={editUser} onSubmit={handleSubmitEdit} onCancel={handleCancel}/>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserManager;
