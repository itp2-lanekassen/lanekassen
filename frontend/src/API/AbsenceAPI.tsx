import { backendUrl, Absence, NewAbsence } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/Absence`;

export function getAllAbsences(
  fromDate?: string,
  toDate?: string
): Promise<AxiosResponse<Absence[]>> {
  const query = new URLSearchParams();

  if (fromDate) {
    query.append('fromDate', fromDate);
  }

  if (toDate) {
    query.append('toDate', toDate);
  }

  const queryStr = query.toString();

  return axios.get(`${url}${queryStr.length ? '?' : ''}${queryStr}`);
}

export function getAbsenceById(absenceId: number): Promise<AxiosResponse<Absence>> {
  return axios.get(`${url}/${absenceId}`);
}

export function postAbsence(absence: NewAbsence): Promise<AxiosResponse<Absence>> {
  return axios.post(url, absence);
}

export function updateAbsence(
  absenceId: number,
  absence: Absence
): Promise<AxiosResponse<Absence>> {
  return axios.put(`${url}/${absenceId}`, absence);
}

export function deleteAbsence(absenceId: number): Promise<AxiosResponse<Absence>> {
  return axios.delete(`${url}/${absenceId}`);
}

export async function getAbsencesByUserId(
  userId: number,
  fromDate?: string,
  toDate?: string
): Promise<AxiosResponse<Absence[]>> {
  const query = new URLSearchParams();

  if (fromDate) {
    query.append('fromDate', fromDate);
  }

  if (toDate) {
    query.append('toDate', toDate);
  }

  const queryStr = query.toString();

  return axios.get(`${url}/user/${userId}${queryStr.length ? '?' : ''}${queryStr}`);
}

export default {
  getAllAbsences,
  getAbsenceById,
  postAbsence,
  updateAbsence,
  deleteAbsence
};
