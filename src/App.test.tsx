import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render a list of tasks', () => {
    const { getByText } = render(<App />);
    const headingElement = getByText(/My Todo List/i);
    const addTaskButton = getByText(/Add Task/i);
    expect(headingElement).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
});
