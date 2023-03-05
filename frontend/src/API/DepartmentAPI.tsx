import { backendUrl, Department } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/Department`;

export function getAllDepartments(): Promise<AxiosResponse<Department[]>> {
  return axios.get(url);
}

export function getDepartmentById(departmentId: number): Promise<AxiosResponse<Department>> {
  return axios.get(`${url}/${departmentId}`);
}

export function getSectionsByDepartmentId(
  departmentId: number
): Promise<AxiosResponse<Department>> {
  return axios.get(`${url}/${departmentId}/sections`);
}

export function getSubjectFieldsByDepartmentId(
  departmentId: number
): Promise<AxiosResponse<Department>> {
  return axios.get(`${url}/${departmentId}/subjectFields`);
}

export function getTeamsByDepartmentId(departmentId: number): Promise<AxiosResponse<Department>> {
  return axios.get(`${url}/${departmentId}/teams`);
}

export function getRolesByDepartmentId(departmentId: number): Promise<AxiosResponse<Department>> {
  return axios.get(`${url}/${departmentId}/roles`);
}

export function postDepartment(department: Department): Promise<AxiosResponse<Department>> {
  return axios.post(url, department);
}

export function updateDepartment(
  departmentId: number,
  department: Department
): Promise<AxiosResponse<Department>> {
  return axios.put(`${url}/${departmentId}`, department);
}

export function deleteDepartment(departmentId: number): Promise<AxiosResponse<Department>> {
  return axios.delete(`${url}/${departmentId}`);
}

export default {
  getAllDepartments,
  getDepartmentById,
  postDepartment,
  updateDepartment,
  deleteDepartment,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId,
  getRolesByDepartmentId
};
