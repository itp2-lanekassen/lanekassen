import { Holiday } from '@/types/interfaces';
import axios, { AxiosResponse } from 'axios';

// Free external API for holidays. Limited requests before locked out. More infocan be found here: https://webapi.no/
const url = 'https://webapi.no/api/v1/holidays/';

export function getHolidaysByYear(year: number): Promise<AxiosResponse<{ data: Holiday[] }>> {
  return axios.get(`${url}${year}`);
}

export default {
  getHolidaysByYear
};
