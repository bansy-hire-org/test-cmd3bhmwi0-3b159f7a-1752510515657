import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = filterPriority === 'all'
    ? tasks
    : tasks.filter(task => task.priority === filterPriority);

  return (
    <div className="app">
      <h1>React Task Manager</h1>
      <TaskForm addTask={addTask} />
      <div>
        <label htmlFor="priorityFilter">Filter by Priority:</label>
        <select
          id="priorityFilter"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;