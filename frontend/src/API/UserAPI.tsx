import { User, backendUrl, NewUser } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/User`;

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

export function updateUser(userId: number, user: User): Promise<AxiosResponse<User>> {
  return axios.put(`${url}/${userId}`, user);
}

export function deleteUser(userId: number): Promise<AxiosResponse<User>> {
  return axios.delete(`${url}/${userId}`);
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
