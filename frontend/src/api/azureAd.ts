import { graphConfig } from '@/authConfig';
import { AzureAdUser } from '@/types/azureAd';
import axios, { AxiosResponse } from 'axios';

export async function getAzureAdUser(accessToken: string): Promise<AxiosResponse<AzureAdUser>> {
  return axios.get(graphConfig.graphMeEndpoint, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
