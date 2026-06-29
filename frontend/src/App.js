import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Auth from './components/Auth';
import TodoList from './components/TodoList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, [token]);

  const handleLogin = (loginData) => {
    setLoading(true);
    axios.post(`${API_URL}/auth/login`, loginData)
      .then(response => {
        const { access_token, user: userData } = response.data;
        setToken(access_token);
        setUser(userData);
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(userData));
      })
      .catch(error => {
        alert(error.response?.data?.detail || 'Login failed');
      })
      .finally(() => setLoading(false));
  };

  const handleRegister = (registerData) => {
    setLoading(true);
    axios.post(`${API_URL}/auth/register`, registerData)
      .then(response => {
        const { access_token, user: userData } = response.data;
        setToken(access_token);
        setUser(userData);
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(userData));
      })
      .catch(error => {
        alert(error.response?.data?.detail || 'Registration failed');
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!token || !user) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} loading={loading} />;
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>📝 My Todos</h1>
        <div className="user-section">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      <TodoList token={token} />
    </div>
  );
}

export default App;
