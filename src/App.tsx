import React, { useState } from 'react';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');

  const handleNewTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
    }
  };

  const handleRemoveTask = (task: Task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleRenameTask = (task: Task, newName: string) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, name: newName };
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
  };

  const handleToggleTaskCompletion = (task: Task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
  };

  const unfinishedTasks = tasks.filter((task) => !task.completed);

  let filteredTasks = tasks;

  if (taskFilter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (taskFilter === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  return (
    <div className="p-4 mx-auto" style={{width: '50%'}}>
      <h1 className="text-primary p-4 d-flex justify-content-center">My Task List</h1>
      <div className="mb-3 input-group">
        <input type="text" placeholder='New Task' className="form-control" value={newTaskName} onChange={handleNewTaskNameChange} />
        <button className="btn btn-primary btn-lg" onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="btn-group mb-3">
        <button className={`btn btn-lg btn-outline-primary ${taskFilter === 'all' ? 'active' : ''}`} onClick={() => setTaskFilter('all')}>All({tasks.length})</button>
        <button className={`btn btn-lg btn-outline-primary ${taskFilter === 'completed' ? 'active' : ''}`} onClick={() => setTaskFilter('completed')}>Completed({tasks.filter((task) => task.completed).length})</button>
        <button className={`btn btn-lg btn-outline-primary ${taskFilter === 'active' ? 'active' : ''}`} onClick={() => setTaskFilter('active')}>Active({tasks.filter((task) => !task.completed).length})</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onRenameTask={handleRenameTask}
        onToggleTaskCompletion={handleToggleTaskCompletion}
        onRemoveTask={handleRemoveTask}
      />
      <p className='p-4 px-1 text-info'><b>{unfinishedTasks.length}</b> tasks left unfinished</p>
    </div>
  );
};

export default App;
