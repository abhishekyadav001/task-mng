import { axiosInstance } from "../../utils/axiosConfig";
import * as taskTypes from "./actionType";
import { Task } from "./taskTypes";

export const fetchTasks = () => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    const response = await axiosInstance.get("/task/");
    console.log(response.data);
    dispatch({ type: taskTypes.FETCH_TASKS, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const addTask = (task: { title: string; description: string }) => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });

    const response = await axiosInstance.post("/task/", task);
    dispatch({ type: taskTypes.ADD_TASK, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const editTask = (task: Task) => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    console.log(task, 1);
    const response = await axiosInstance.put(`/task/${task._id}`, task);
    dispatch({ type: taskTypes.EDIT_TASK, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const deleteTask = (id: number) => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    await axiosInstance.delete(`/task/${id}`);
    dispatch({ type: taskTypes.DELETE_TASK, payload: id });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const toggleTask = (id: number) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    // const task = getState().tasks.tasks.find((t: Task) => t.id === id);
    const response = await axiosInstance.patch(`/task/${id}/toggle`);
    dispatch({ type: taskTypes.TOGGLE_TASK, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const searchTask = (query: string) => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    const response = await axiosInstance.get(`/task?search=${query}`);
    console.log(response, 1);
    dispatch({ type: taskTypes.SEARCH_TASK, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const filterTask = (status: boolean) => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    const response = await axiosInstance.get(`/task?completed=${status}`);
    dispatch({ type: taskTypes.FILTER_TASK, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};

export const paginateTasks = (page: number) => async (dispatch: any) => {
  try {
    dispatch({ type: taskTypes.TASKS_REQUEST });
    const response = await axiosInstance.get(`/task?page=${page}`);
    dispatch({ type: taskTypes.PAGINATE_TASKS, payload: response.data });
  } catch (error: any) {
    dispatch({ type: taskTypes.TASK_ERROR, payload: error.message });
  }
};
