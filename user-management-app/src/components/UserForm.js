import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', user)
      .then(response => setMessage('User created successfully'))
      .catch(() => setMessage('Error creating user'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
      <button type="submit">Create User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UserForm;

