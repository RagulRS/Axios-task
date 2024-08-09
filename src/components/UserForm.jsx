import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserForm = ({ editingUser, setEditingUser, fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setData] = useState({});
  

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editingUser);
    if (editingUser) {
      axios({method: "put", url : `https://jsonplaceholder.typicode.com/users/${editingUser.id}`, data:{ name, email }})
        .then(console.log(fetchUsers))
        .catch(error => console.error('Error updating user:', error));
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', { name, email })
        .then(fetchUsers)
        .catch(error => console.error('Error adding user:', error));
    }
    setEditingUser(null);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button class="btn btn-primary" type="submit">{editingUser ? 'Update' : 'Add'}</button>
      
    </form>
  );
};

export default UserForm;
