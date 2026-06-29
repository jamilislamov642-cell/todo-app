import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onToggle(e.target.checked)}
        className="todo-checkbox"
      />
      <div className="todo-text">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
      </div>
      <button
        onClick={onDelete}
        className="delete-btn"
        title="Delete task"
      >
        ✕
      </button>
    </div>
  );
}

export default TodoItem;
