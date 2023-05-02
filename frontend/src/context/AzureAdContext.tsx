import { getAzureAdUser } from '@/api/azureAd';
import { loginRequest } from '@/authConfig';
import { AzureAdUser } from '@/types/azureAd';
import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createContext, FC, ReactNode, useContext } from 'react';

interface AzureAdContextProps {
  children?: ReactNode;
}

const AzureAdContext = createContext<AzureAdUser | undefined>(undefined);

export const useAzureAdContext = () => {
  const ctx = useContext(AzureAdContext);

  if (!ctx) throw new Error('AzureAdContext must be used within its provider');

  return ctx;
};

const AzureAdContextProvider: FC<AzureAdContextProps> = ({ children }) => {
  const { instance, accounts } = useMsal();

  const {
    isLoading,
    isError,
    error,
    data: azureUser
  } = useQuery(
    ['azure-ad-user'],
    async () => {
      const token = (
        await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
          forceRefresh: true
        })
      ).accessToken;

      return (await getAzureAdUser(token)).data;
    },
    { retry: false }
  );

  if (isLoading) return <div>Henter bruker fra Azure AD...</div>;
  if (isError) {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 401) {
      instance.acquireTokenRedirect({
        ...loginRequest,
        account: accounts[0]
      });
    } else if (axiosError.response && axiosError.response.status === 400) {
      return <div>Ugyldig forespørsel. Sjekk at alle påkrevde felt er utfylt.</div>;
    } else if (axiosError.response && axiosError.response.status === 403) {
      return <div>Du har ikke tilgang til denne ressursen.</div>;
    } else if (axiosError.message === 'Network Error') {
      return <div>Det oppstod en nettverksfeil. Prøv igjen senere.</div>;
    } else {
      console.error(error);
      return <div>Noe gikk galt. Prøv igjen senere.</div>;
    }
  }
  /*   if (isError) {
    instance.acquireTokenRedirect({
      ...loginRequest,
      account: accounts[0]
    });
  } */

  return <AzureAdContext.Provider value={azureUser}>{children}</AzureAdContext.Provider>;
};
export default AzureAdContextProvider;
