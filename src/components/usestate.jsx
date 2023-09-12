import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, action.text] };
    case 'EDIT_TODO':
      const updatedTodos = state.todos.map((todo, index) =>
        index === action.index ? action.text : todo
      );
      return { todos: updatedTodos };
    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter((_, index) => index !== action.index);
      return { todos: filteredTodos };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState('');
  const [editText, setEditText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputText === '') return;
    dispatch({ type: 'ADD_TODO', text: inputText });
    setInputText('');
  };

  const editTodo = () => {
    if (editText === '') return;
    dispatch({ type: 'EDIT_TODO', text: editText, index: editIndex });
    setEditIndex(null);
    setEditText('');
  };

  const deleteTodo = (index) => {
    dispatch({ type: 'DELETE_TODO', index });
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="input-text"
      />
      <button onClick={addTodo} className="add-button">
        Add
      </button>

      {state.todos.map((todo, index) => (
        <div key={index} className="todo-item">
          {editIndex === index ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <button onClick={editTodo} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <div>
              {todo}
              <div className="edit-buttons">
                <button onClick={() => setEditIndex(index)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => deleteTodo(index)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
