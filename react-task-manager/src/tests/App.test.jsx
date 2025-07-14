import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders task form', () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Task title/i);
    expect(taskInput).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Task title/i);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.change(taskInput, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);
    const taskElement = screen.getByText(/Test Task - Priority: medium/i); // Bug: Default priority is not showing
    expect(taskElement).toBeInTheDocument();
  });

    test('filters tasks by priority', () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Task title/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: 'High Priority Task' } });
    fireEvent.click(addButton);

    const prioritySelect = screen.getByRole('combobox', { name: /Filter by Priority:/i });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });

    const taskElement = screen.getByText(/High Priority Task - Priority: medium/i);
    expect(taskElement).toBeInTheDocument();
  });

});