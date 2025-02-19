export interface Task {
  userId: number;
  _id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  searchQuery: string;
  filterStatus: string;
  currentPage: number;
  tasksPerPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

export interface Action {
  type: string;
  payload?: any;
}
