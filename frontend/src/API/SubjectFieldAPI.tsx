import { backendUrl, SubjectField } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/SubjectField`;

export function getAllSubjectFields(): Promise<AxiosResponse<SubjectField[]>> {
  return axios.get(url);
}

export function getSubjectFieldById(subjectFieldId: number): Promise<AxiosResponse<SubjectField>> {
  return axios.get(`${url}/${subjectFieldId}`);
}

export function postSubjectField(subjectField: SubjectField): Promise<AxiosResponse<SubjectField>> {
  return axios.post(url, subjectField);
}

export function updateSubjectField(
  subjectFieldId: number,
  subjectField: SubjectField
): Promise<AxiosResponse<SubjectField>> {
  return axios.put(`${url}/${subjectFieldId}`, subjectField);
}

export function deleteSubjectField(subjectFieldId: number): Promise<AxiosResponse<SubjectField>> {
  return axios.delete(`${url}/${subjectFieldId}`);
}

export function getUsersInSubjectField(
  subjectFieldId: number
): Promise<AxiosResponse<SubjectField>> {
  return axios.get(`${url}/${subjectFieldId}/users`);
}

export default {
  getAllSubjectFields,
  getSubjectFieldById,
  postSubjectField,
  updateSubjectField,
  deleteSubjectField,
  getUsersInSubjectField
};
