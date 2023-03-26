import { Absence, NewAbsence } from '../types/types';
import axios, { AxiosResponse } from 'axios';
import moment from 'moment';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

//return the first startDate of an absence after a specific date, return undefined if there is none
export async function getDatePickerMaxForAbsence(
  userId: number,
  date: Date
): Promise<Date | undefined> {
  const absences = await getAbsencesByUserId(userId).then((response) => response.data);
  let returnDate = undefined;
  let earliestDate = date;
  let diff = Infinity;
  absences.map((a) => {
    if (
      date.valueOf() < new Date(a.startDate).valueOf() &&
      new Date(a.startDate).valueOf() - date.valueOf() < diff
    ) {
      earliestDate = new Date(
        moment(a.startDate).add(-1, 'days').toISOString(true).split('+')[0] + 'Z'
      );
      returnDate = earliestDate;
      diff = new Date(a.startDate).valueOf() - new Date(date).valueOf();
    }
  });
  return returnDate;
}

//return the first endDate of an absence before a specific date, return undefined if there is none
export async function getDatePickerMinForAbsence(
  userId: number,
  date: Date
): Promise<string | undefined> {
  const absences = await getAbsencesByUserId(userId).then((response) => response.data);
  let returnDate = undefined;
  let earliestDate = date;
  let diff = Infinity;
  absences.map((a) => {
    if (
      date.valueOf() > new Date(a.endDate).valueOf() &&
      date.valueOf() - new Date(a.endDate).valueOf() < diff
    ) {
      earliestDate = new Date(
        moment(a.endDate).add(1, 'days').toISOString(true).split('+')[0] + 'Z'
      );
      returnDate = earliestDate;
      diff = new Date(date).valueOf() - new Date(a.endDate).valueOf();
    }
  });
  return returnDate;
}

//Return array with all dates that a user has registered an absence
export async function getDisableDates(userId: number): Promise<Date[]> {
  const absences = await getAbsencesByUserId(userId).then((response) => response.data);
  const dateArray: Date[] = [];
  absences.map((a) => {
    let tempDate = new Date(a.startDate);
    dateArray.push(tempDate);
    while (
      tempDate.toISOString().split('T')[0] !== new Date(a.endDate).toISOString().split('T')[0]
    ) {
      tempDate = new Date(moment(tempDate).add(1, 'days').toISOString(true).split('+')[0] + 'Z');
    }
  });
  return dateArray;
}

export default {
  getAllAbsences,
  getAbsenceById,
  postAbsence,
  updateAbsence,
  deleteAbsence
};
