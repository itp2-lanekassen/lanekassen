import { AbsenceType, NewAbsenceType } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${backendUrl}/absenceType`;

export function getAllAbsenceTypes(): Promise<AxiosResponse<AbsenceType[]>> {
  return axios.get(url);
}

export function getAbsenceTypeById(absenceTypeId: number): Promise<AxiosResponse<AbsenceType>> {
  return axios.get(`${url}/${absenceTypeId}`);
}

export function postAbsenceType(absenceType: NewAbsenceType): Promise<AxiosResponse<AbsenceType>> {
  return axios.post(url, absenceType);
}

export function updateAbsenceType(
  absenceTypeId: number,
  absenceType: AbsenceType
): Promise<AxiosResponse<AbsenceType>> {
  return axios.put(`${url}/${absenceTypeId}`, absenceType);
}

export function deleteAbsenceType(absenceTypeId: number): Promise<AxiosResponse<AbsenceType>> {
  return axios.delete(`${url}/${absenceTypeId}`);
}

export default {
  getAllAbsenceTypes,
  getAbsenceTypeById,
  postAbsenceType,
  updateAbsenceType,
  deleteAbsenceType
};
