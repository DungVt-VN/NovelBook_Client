import { Fragment, useState, useEffect } from 'react';
import './EditUser.scss';
import User from '../../services/models/User';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Select from 'react-select';

// Define ValueType as a generic type for selected values
type ValueType = {
    value: string;
    label: string;
};

const USER_MANAGER_URL = "http://localhost:5167/admin/users";

interface EditUserProps {
    user: User;
    onSubmit: () => void;
    onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onSubmit, onCancel }) => {
    const { token } = useAuth();
    const [formValues, setFormValues] = useState<User>({ ...user });

    useEffect(() => {
        setFormValues({ ...user });
    }, [user]);

    const handleChange = (selectedOptions: ValueType[] | null) => {
        setFormValues(prev => ({
            ...prev,
            roles: selectedOptions ? selectedOptions.map(option => option.value) : [],
        }));
    };

    const handleCancel = () => {
        setFormValues({ ...user });
        onCancel();
    };

    const handleSubmitEdit = async (updatedUser: User) => {
        if (isNaN(updatedUser.lockoutEnd)) {
            updatedUser.emailConfirmed = 0;
        } else {
            updatedUser.emailConfirmed = updatedUser.lockoutEnd;
        }
        if(updatedUser.emailConfirmed === null) {
            updatedUser.emailConfirmed = 0;
        }

        const data = {
            id: updatedUser.id,
            userName: updatedUser.userName,
            email: updatedUser.email,
            emailConfirmed: updatedUser.emailConfirmed,
            phoneNumber: updatedUser.phoneNumber !== null ? updatedUser.phoneNumber : '',
            roles: updatedUser.roles,
        };

        console.log(data);
        try {
            const response = await axios.put(`${USER_MANAGER_URL}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            window.alert(response.data)
            onSubmit();
        } catch (error) {
            console.error('Error updating user:', error);
            window.alert("Update user failed!");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmitEdit(formValues);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: name === 'roles' ? value.split(',').map(role => role.trim()) :
                name === 'lockoutEnd' ? parseInt(value) :  // Chỉnh sửa từ parseFloat thành parseInt
                    value,
        }));
    };

    return (
        <Fragment>
            <div className="edit-container">
                <div className="edit-user-form">
                    <h2 className='text-2xl font-bold text-red-600'>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="userName"
                                value={formValues.userName}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formValues.phoneNumber || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Lockout End (number of days):
                            <input
                                type="number"
                                name="lockoutEnd"
                                value={formValues.lockoutEnd || 0}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Roles (separated by commas):
                            <Select
                                isMulti
                                name="roles"
                                value={formValues.roles.map(role => ({ value: role, label: role }))}
                                onChange={(selectedOptions) => handleChange(selectedOptions as ValueType[])}
                                options={[
                                    { value: 'Admin', label: 'Admin' },
                                    { value: 'User', label: 'User' },
                                    { value: 'Moderator', label: 'Moderator' },
                                    { value: 'Editor', label: 'Editor' },
                                    { value: 'Creator', label: 'Creator' },
                                    { value: 'Premium', label: 'Premium' }
                                ]}
                            />
                        </label>
                        <button className='bg-green-500' type="submit">Save</button>
                        <button className='bg-red-500' type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default EditUser;
