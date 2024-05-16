import axios from "axios";
import { AddTodoType, UpdateTodoType } from "../Views/Public/Tasks/tasks-type";
const baseURL = `https://dummyjson.com/todos/`;
const API = axios.create({
  baseURL: baseURL,
});

export const getTodos = (id: number) => API.get(`/user/${id}`);
export const addTodo = (data: AddTodoType) =>
  API.post(`/add`, { ...data });
export const updateTodo = (data: UpdateTodoType) =>
  API.put(`/${data.userId}`, {
    todo: data.todo,
    completed: data.completed,
  });
export const deleteTodo = (id: number) => API.delete(`/${id}`);
