import axios from "axios";
import * as types from "./actionTypes";

export const getTasks = (payload) => (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQUEST });
  return axios
    .get("https://my-crud-app-api.herokuapp.com/tasks")
    .then((r) => dispatch({ type: types.GET_TASKS_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: types.GET_TASKS_FAILURE, payload: e }));
};

export const addNewTask = (payload) => (dispatch) => {
    dispatch({ type: types.ADD_TASK_REQUEST });
    return axios
      .post(`https://my-crud-app-api.herokuapp.com/tasks`, payload)
      .then((r) => dispatch({ type: types.ADD_TASK_SUCCESS, payload: r.data }))
      .catch((e) => dispatch({ type: types.ADD_TASK_FAILURE, payload: e }));
  };

export const deleteTask = (params) => (dispatch) => {
  dispatch({ type: types.DELETE_TASK_REQUEST });
  return axios
    .delete(`https://my-crud-app-api.herokuapp.com/tasks/${params}`)
    .then((r) => dispatch({ type: types.DELETE_TASK_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: types.DELETE_TASK_FAILURE, payload: e }));
};

export const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASKS_REQUEST });
  return axios
    .patch(`https://my-crud-app-api.herokuapp.com/tasks/${id}`, payload)
    .then((r) =>
      dispatch({ type: types.UPDATE_TASKS_SUCCESS, payload: r.data })
    )
    .catch((e) => dispatch({ type: types.UPDATE_TASKS_FAILURE, payload: e }));
};

export const addSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.ADD_SUBTASKS_REQUEST });
  return axios
    .patch(`https://my-crud-app-api.herokuapp.com/tasks/${id}`, payload)
    .then((r) =>
      dispatch({ type: types.ADD_SUBTASKS_SUCCESS, payload: r.data })
    )
    .catch((e) => dispatch({ type: types.ADD_SUBTASKS_FAILURE, payload: e }));
};

export const deleteSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.DELETE_SUBTASKS_REQUEST });
  return axios
    .patch(`https://my-crud-app-api.herokuapp.com/tasks/${id}`, payload)
    .then((r) => dispatch({ type: types.DELETE_SUBTASKS_SUCCESS, payload: r }))
    .catch((e) =>
      dispatch({ type: types.DELETE_SUBTASKS_FAILURE, payload: e })
    );
};

export const updateSubTasksStatus = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_SUBTASKS_STATUS_REQUEST });
  return axios
    .patch(`https://my-crud-app-api.herokuapp.com/tasks/${id}`, payload)
    .then((r) =>
      dispatch({ type: types.UPDATE_SUBTASKS_STATUS_SUCCESS, payload: r.data })
    )
    .catch((e) =>
      dispatch({ type: types.UPDATE_SUBTASKS_STATUS_FAILURE, payload: e })
    );
};
