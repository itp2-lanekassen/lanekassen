import { User, NewUser, PageResponse, UserFilter } from '../types/interfaces';
import axios, { AxiosResponse } from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${backendUrl}/user`;

export function getAllUsers(): Promise<AxiosResponse<User[]>> {
  return axios.get(url);
}

export function getUserById(userId: number): Promise<AxiosResponse<User>> {
  return axios.get(`${url}/${userId}`);
}

export function getUserByAzureId(azureId: string): Promise<AxiosResponse<User>> {
  return axios.get(`${url}/azure/${azureId}`);
}

export function postUser(user: NewUser): Promise<AxiosResponse<User>> {
  return axios.post(url, user);
}

export function updateUser(userId: number, user: NewUser): Promise<AxiosResponse<User>> {
  return axios.put(`${url}/${userId}`, user);
}

export function deleteUser(userId: number): Promise<AxiosResponse<User>> {
  return axios.delete(`${url}/${userId}`);
}

export function filterUsers(
  filters: { page: number; excludeIds: number[] } & UserFilter
): Promise<AxiosResponse<PageResponse<User>>> {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined) {
      if (Array.isArray(val)) {
        val.forEach((id) => query.append(key, String(id)));
      } else {
        query.append(key, String(val));
      }
    }
  });

  const queryStr = query.toString();

  return axios.get(`${url}/filter${queryStr.length ? '?' : ''}${queryStr}`);
}

export default {
  getAllUsers,
  getUserById,
  getUserByAzureId,
  postUser,
  updateUser,
  deleteUser
};

/* export const getUser = async () => {
  try {
    const fakeId = 'This-is-a-fake-azure-id'; // John Doe has this AzureId in the database
    axios
      .get(`${backendUrl}/User/azure/${fakeId}`)
      .then((response) => {
        const data = response.data;
        if (data != null || data != undefined) {
          console.log('User exists');
          console.log(data);
          // TODO: navigate to home page
        } else {
          console.error('Data is null or undefined');
        }
      })
      .catch((error) => {
        console.log('User not found');
        console.error(error);
        // TODO: navigate to registration page
      });
  } catch (error) {
    console.log('Error logging in');
    console.error(error);
    // TODO: handle error
  }
}; */