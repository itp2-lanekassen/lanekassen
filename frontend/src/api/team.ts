import { Team, TeamDTO } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${backendUrl}/team`;

export function getAllTeams(): Promise<AxiosResponse<Team[]>> {
  return axios.get(url);
}

export function getTeamById(teamId: number): Promise<AxiosResponse<Team>> {
  return axios.get(`${url}/${teamId}`);
}

export function postTeam(team: TeamDTO): Promise<AxiosResponse<Team>> {
  return axios.post(url, team);
}

export function updateTeam(teamId: number, team: TeamDTO): Promise<AxiosResponse<Team>> {
  return axios.put(`${url}/${teamId}`, team);
}

export function deleteTeam(teamId: number): Promise<AxiosResponse<Team>> {
  return axios.delete(`${url}/${teamId}`);
}

export function getUsersInTeam(teamId: number): Promise<AxiosResponse<Team>> {
  return axios.get(`${url}/${teamId}/users`);
}

export default {
  getAllTeams,
  getTeamById,
  postTeam,
  updateTeam,
  deleteTeam,
  getUsersInTeam
};
