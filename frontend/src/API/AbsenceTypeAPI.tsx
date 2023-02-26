import { backendUrl, AbsenceType } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/AbsenceType`;

export function getAllAbsenceTypes(): Promise<AxiosResponse<AbsenceType[]>> {
  return axios.get(url);
}

export function getAbsenceTypeById(absenceTypeId: number): Promise<AxiosResponse<AbsenceType>> {
  return axios.get(`${url}/${absenceTypeId}`);
}

export function postAbsenceType(absenceType: AbsenceType): Promise<AxiosResponse<AbsenceType>> {
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
