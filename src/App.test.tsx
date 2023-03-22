import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {    
    test('renders the initial state correctly', () => {
        render(<App />);
        expect(screen.getByText('My Task List')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('New Task')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All(0)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Completed(0)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Active(0)' })).toBeInTheDocument(); 
    });
    

    test('Adds a new task correctly', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('New Task');
        const button = screen.getByRole('button', { name: 'Add Task' });

        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(button);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All(1)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Active(1)' })).toBeInTheDocument();
    });

    test('Edit the task correctly', () => {
        render(<App />);

        const input = screen.getByPlaceholderText('New Task');
        const button = screen.getByRole('button', { name: 'Add Task' });

        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(button);

        // edit the task
        const editButton = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editButton);
        const inputToEdit = screen.getByDisplayValue('Task 1');
        fireEvent.change(inputToEdit, { target: { value: 'Task 2' } });
        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All(1)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Active(1)' })).toBeInTheDocument();
    });

    test('Remove the task correctly', () => {
        render(<App />);
        
        // Add a task
        const input = screen.getByPlaceholderText('New Task');
        const addButton = screen.getByRole('button', { name: 'Add Task' });
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
        
        // Remove the task
        const removeButton = screen.getByRole('button', { name: 'Remove' });
        fireEvent.click(removeButton);
        
        // Ensure the task is removed from the DOM
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        
        // Ensure the task is removed from the task list
        expect(screen.getByRole('button', { name: 'All(0)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Active(0)' })).toBeInTheDocument();
      });

      test('Mark the task as completed', () => {
        render(<App />);
        
        // Add a task
        const input = screen.getByPlaceholderText('New Task');
        const addButton = screen.getByRole('button', { name: 'Add Task' });
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
        
        // Remove the task
        const mcButton = screen.getByRole('button', { name: 'Mark Completed' });
        fireEvent.click(mcButton);
        
        
        // Ensure the task is removed from the task list
        expect(screen.getByRole('button', { name: 'Unmark Completed' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All(1)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Completed(1)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Active(0)' })).toBeInTheDocument();
      });

      test('UnMark the task as completed', () => {
        render(<App />);
        
        // Add a task
        const input = screen.getByPlaceholderText('New Task');
        const addButton = screen.getByRole('button', { name: 'Add Task' });
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
        
        // Remove the task
        const mcButton = screen.getByRole('button', { name: 'Mark Completed' });
        fireEvent.click(mcButton);
        
        //check unmark completed button is there
        expect(screen.getByRole('button', { name: 'Unmark Completed' })).toBeInTheDocument();
        
        // Unmark Completed the task
        const mucButton = screen.getByRole('button', { name: 'Unmark Completed' });
        fireEvent.click(mcButton);

        // Ensure the task is removed from the task list
        expect(screen.getByRole('button', { name: 'Mark Completed' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All(1)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Completed(0)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Active(1)' })).toBeInTheDocument();
      });

    

})
