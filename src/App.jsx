import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css'

const App = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Crud Operation Using Axios</h1>
      <UserForm editingUser={editingUser} setEditingUser={setEditingUser} fetchUsers={fetchUsers} />
      <UserList users={users} setEditingUser={setEditingUser} />
    </div>
  );
};

export default App;
