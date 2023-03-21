type Task = {
  id: number;
  name: string;
  completed: boolean;
};

type TaskFilter = 'all' | 'active' | 'completed';

type TaskProps = {
  task: Task;
  onRenameTask: (task: Task, newName: string) => void;
  onToggleTaskCompletion: (task: Task) => void;
  onRemoveTask: (task: Task) => void;
};

type TaskListProps = {
  tasks: Task[];
  taskFilter: TaskFilter;
  onRenameTask: (task: Task, newName: string) => void;
  onToggleTaskCompletion: (task: Task) => void;
  onRemoveTask: (task: Task) => void;
  onSetTaskFilter: (filter: TaskFilter) => void;
};

type NewTaskFormProps = {
  newTaskName: string;
  onNewTaskNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
};

type AppProps = {};
