import {
  FETCH_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SEARCH_TASK,
  FILTER_TASK,
  PAGINATE_TASKS,
  TASK_ERROR,
  TASKS_REQUEST,
} from "./actionType";
import { TaskState, Action } from "./taskTypes";

const initialState: TaskState = {
  loading: false,
  tasks: [],
  searchQuery: "",
  filterStatus: "all",
  totalItems: 0,
  currentPage: 1,
  tasksPerPage: 5,
  totalPages: 10,
  error: null,
};

const taskReducer = (state = initialState, action: Action): TaskState => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TASKS:
      console.log(action.payload);
      return {
        ...state,
        tasks: action.payload.tasks,
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        error: null,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case TOGGLE_TASK:
      console.log(action.payload);
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case SEARCH_TASK:
      console.log(action.payload.tasks);
      return {
        ...state,
        tasks: action.payload.tasks,
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case FILTER_TASK:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case PAGINATE_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case TASK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default taskReducer;
