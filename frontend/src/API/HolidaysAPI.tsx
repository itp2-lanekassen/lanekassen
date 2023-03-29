import { Holiday } from '@/types/types';
import axios, { AxiosResponse } from 'axios';

const url = 'https://webapi.no/api/v1/holidays/';

export function getHolidaysByYear(year: number): Promise<AxiosResponse<{ data: Holiday[] }>> {
  return axios.get(`${url}${year}`);
}

export default {
  getHolidaysByYear
};
