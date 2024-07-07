import React, { useState } from 'react';
import User from '../../services/models/User';

interface UserTableProps {
  users: User[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  onConfirmEmail: (email: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onConfirmEmail }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterConfirmed, setFilterConfirmed] = useState<boolean | null>(null);
  const [filterRole, setFilterRole] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleConfirmedFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterConfirmed(value === 'true' ? true : value === 'false' ? false : null);
  };

  const handleRoleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterRole(value);
  };

  const copyIdToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    alert(`Copied ID "${id}" to clipboard`);
  };

  const filteredUsers = users.filter(user =>
    (user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())))
    &&
    (filterConfirmed === null || user.emailConfirmed === filterConfirmed)
    &&
    (filterRole === '' || user.roles.includes(filterRole))
  );

  return (
    <div className="user-table-container">
      <div className="filter-container m-3">
        <input
          type="text"
          placeholder="Search by Email, Username, Phone Number"
          value={searchTerm}
          onChange={handleSearchChange}
          className='w-96 p-2 border-2'
        />
        <select value={filterConfirmed === null ? '' : filterConfirmed.toString()} onChange={handleConfirmedFilterChange} className='p-2'>
          <option value="">Filter by Confirmed</option>
          <option value="true">Confirmed</option>
          <option value="false">Not Confirmed</option>
        </select>
        <select value={filterRole} onChange={handleRoleFilterChange} className='p-2'>
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
          <option value="Editor">Editor</option>
          <option value="Creator">Creator</option>
          <option value="Premium">Premium</option>

        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Stt</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Confirmed</th>
            <th>Phone Number</th>
            <th>Lockout</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td title={`Click to copy: ${user.id}`} onClick={() => copyIdToClipboard(user.id)}>
                {user.id.substring(0, 8)}{user.id.length > 8 && '...'}
              </td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td className='font-bold'>{user.emailConfirmed ? 'Yes' : 'No'}
                {!user.emailConfirmed && (
                  <button className='bg-green-500 ml-5 mr-3' onClick={() => onConfirmEmail(user.email)}>Confirm</button>
                )}
              </td>
              <td>{user.phoneNumber || '-'}</td>
              <td>{user.lockoutEnd || '-'}</td>
              <td>{user.roles.join(', ')}</td>
              <td>
                <button className='bg-blue-600' onClick={() => onEdit(user.id)}>Edit</button>
                <button className='bg-red-700' onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
