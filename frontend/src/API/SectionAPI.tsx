import { backendUrl, Section } from '../types/types';
import axios, { AxiosResponse } from 'axios';

const url = `${backendUrl}/Section`;

export function getAllSections(): Promise<AxiosResponse<Section[]>> {
  return axios.get(url);
}

export function getSectionById(sectionId: number): Promise<AxiosResponse<Section>> {
  return axios.get(`${url}/${sectionId}`);
}

export function postSection(section: Section): Promise<AxiosResponse<Section>> {
  return axios.post(url, section);
}

export function updateSection(
  sectionId: number,
  section: Section
): Promise<AxiosResponse<Section>> {
  return axios.put(`${url}/${sectionId}`, section);
}

export function deleteSection(sectionId: number): Promise<AxiosResponse<Section>> {
  return axios.delete(`${url}/${sectionId}`);
}

export function getUsersInSection(sectionId: number): Promise<AxiosResponse<Section>> {
  return axios.get(`${url}/${sectionId}/users`);
}

export default {
  getAllSections,
  getSectionById,
  postSection,
  updateSection,
  deleteSection,
  getUsersInSection
};
