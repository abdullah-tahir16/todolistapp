import React,{useEffect} from 'react';

import './App.css';
import { useState } from 'react';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const LOCAL_STORAGE_KEY = "react-to-do-todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    // adds new todo to beginning of todos array
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  return (
    <div className="App">
      <header className="App-header">
       <p>To Do List</p>
       <TodoForm addTodo={addTodo}/>
       <TodoList todos={todos} toggleComplete={toggleComplete}
       removeTodo={removeTodo}
       />
      </header>
    </div>
  );
}

export default App;