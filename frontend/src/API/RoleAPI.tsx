import { backendUrl, Role } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/Role`;

export function getAllRoles(): Promise<AxiosResponse<Role[]>> {
  return axios.get(url);
}

export function getRoleById(roleId: number): Promise<AxiosResponse<Role>> {
  return axios.get(`${url}/${roleId}`);
}

export function postRole(role: Role): Promise<AxiosResponse<Role>> {
  return axios.post(url, role);
}

export function updateRole(roleId: number, role: Role): Promise<AxiosResponse<Role>> {
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