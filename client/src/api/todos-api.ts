import { apiEndpoint } from '../config';
import { Todo } from '../types/Todo';
import { CreateTodoRequest } from '../types/CreateTodoRequest';
import Axios from 'axios';
import { UpdateTodoRequest } from '../types/UpdateTodoRequest';

export async function getTodos(idToken: string): Promise<Todo[]> {
  console.log('Fetching posts');

  const response = await Axios.get(`${apiEndpoint}/posts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  console.log('Todos:', response.data);
  return response.data.items;
}

export async function createTodo(idToken: string, newTodo: CreateTodoRequest): Promise<Todo> {
  const response = await Axios.post(`${apiEndpoint}/posts`, JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.item;
}

export async function patchTodo(idToken: string, postId: string, updatedTodo: UpdateTodoRequest): Promise<void> {
  await Axios.patch(`${apiEndpoint}/posts/${postId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function deleteTodo(idToken: string, postId: string): Promise<void> {
  await Axios.delete(`${apiEndpoint}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function getUploadUrl(idToken: string, postId: string): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/posts/${postId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.uploadUrl;
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  console.log(file);
  console.log('This is uploadUrl', uploadFile);
  await Axios.put(uploadUrl, file);
}
