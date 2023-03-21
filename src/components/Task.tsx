import React, { useState } from 'react';

type Props = {
  task: Task;
  onRemoveTask: (task: Task) => void;
  onRenameTask: (task: Task, newName: string) => void;
  onToggleTaskCompletion: (task: Task) => void;
};

const TaskComponent: React.FC<Props> = ({ task, onRemoveTask, onRenameTask, onToggleTaskCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewName(task.name);
  };

  const handleSaveClick = () => {
    if (newName.trim() !== '') {
      onRenameTask(task, newName.trim());
      setIsEditing(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleToggleCompletionClick = () => {
    onToggleTaskCompletion(task);
  };

  const handleRemoveClick = () => {
    onRemoveTask(task);
  };

  if (isEditing) {
    return (
      <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
        <input className="form-control" type="text" value={newName} onChange={handleNameChange} />
        <button className="m-2 btn btn-lg btn-outline-primary" onClick={handleSaveClick}>Save</button>
        <button className="m-2 btn btn-lg btn-outline-primary" onClick={handleCancelClick}>Cancel</button>
      </li>
    );
  } else {
    return (
      <li className="list-group-item" style={{ display: 'flex', alignItems: 'center'}} >
        <span style={{textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span>
        {
          !task.completed && <button className="m-1 btn btn-lg btn-outline-primary" onClick={handleEditClick}><i className="fa fa-edit"></i></button>
        }
        <button className="m-1 btn btn-lg btn-outline-primary" onClick={handleToggleCompletionClick}>
          {task.completed ? 'Unmark Completed' : 'Mark Completed'}
        </button>
        <button  className="fa fa-times"
            style={{ background: 'none', border: 'none' }} onClick={handleRemoveClick} />
      </li>
    );
  }
};

export default TaskComponent;
