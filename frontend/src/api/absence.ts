import { Absence, NewAbsence } from '../types/interfaces';
import axios, { AxiosResponse } from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${backendUrl}/absence`;

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

export function updateAbsence(absence: Absence): Promise<AxiosResponse<Absence>> {
  return axios.put(`${url}/${absence.absenceId}`, absence);
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

//Return an absence that includes the date parameter or return null
export async function getAbsencesByUserIdandDate(
  userId: number,
  date: string
): Promise<AxiosResponse<Absence> | null> {
  const absences = await getAbsencesByUserId(userId).then((response) => response.data);
  let id = null;
  absences.map((a) => {
    if (
      new Date(a.startDate).valueOf() <= new Date(date).valueOf() &&
      new Date(date).valueOf() <= new Date(a.endDate).valueOf()
    ) {
      id = a.absenceId;
      return;
    }
  });
  let isAbsence = null;
  if (id) {
    isAbsence = axios.get(`${url}/${id}`);
  }

  return isAbsence;
}

export default {
  getAllAbsences,
  getAbsenceById,
  postAbsence,
  updateAbsence,
  deleteAbsence
};
