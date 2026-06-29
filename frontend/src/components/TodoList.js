import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function TodoList({ token }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    axios.get(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error))
      .finally(() => setLoading(false));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      alert('Please enter a task title');
      return;
    }

    axios.post(`${API_URL}/todos`, {
      title: newTodoTitle,
      description: newTodoDescription,
      done: false
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodoTitle('');
        setNewTodoDescription('');
      })
      .catch(error => alert('Error creating todo'));
  };

  const updateTodo = (todoId, updatedData) => {
    axios.put(`${API_URL}/todos/${todoId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTodos(todos.map(todo => todo.id === todoId ? response.data : todo));
      })
      .catch(error => alert('Error updating todo'));
  };

  const deleteTodo = (todoId) => {
    axios.delete(`${API_URL}/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoId));
      })
      .catch(error => alert('Error deleting todo'));
  };

  return (
    <div className="todo-container">
      <div className="add-todo-section">
        <h2>Add a New Task</h2>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Task title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task description (optional)"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            rows="2"
          />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="todos-section">
        <h2>Your Tasks</h2>
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one to get started! 🚀</p>
        ) : (
          <div className="todos-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(done) => updateTodo(todo.id, { done })}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
