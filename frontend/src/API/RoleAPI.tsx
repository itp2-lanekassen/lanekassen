import { Role, RoleDTO } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${backendUrl}/Role`;

export function getAllRoles(): Promise<AxiosResponse<Role[]>> {
  return axios.get(url);
}

export function getRoleById(roleId: number): Promise<AxiosResponse<Role>> {
  return axios.get(`${url}/${roleId}`);
}

export function postRole(role: RoleDTO): Promise<AxiosResponse<Role>> {
  return axios.post(url, role);
}

export function updateRole(roleId: number, role: RoleDTO): Promise<AxiosResponse<Role>> {
  return axios.put(`${url}/${roleId}`, role);
}

export function deleteRole(roleId: number): Promise<AxiosResponse<Role>> {
  return axios.delete(`${url}/${roleId}`);
}

export function getUsersInRole(roleId: number): Promise<AxiosResponse<Role>> {
  return axios.get(`${url}/${roleId}/users`);
}

export default {
  getAllRoles,
  getRoleById,
  postRole,
  updateRole,
  deleteRole,
  getUsersInRole
};
