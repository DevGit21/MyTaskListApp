import React from 'react';
import TaskComponent from './Task';

type Props = {
  tasks: Task[];
  onRemoveTask: (task: Task) => void;
  onRenameTask: (task: Task, newName: string) => void;
  onToggleTaskCompletion: (task: Task) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onRemoveTask, onRenameTask, onToggleTaskCompletion }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskComponent
          key={task.id}
          task={task}
          onRemoveTask={onRemoveTask}
          onRenameTask={onRenameTask}
          onToggleTaskCompletion={onToggleTaskCompletion}
        />
      ))}
    </ul>
  );
};

export default TaskList;
