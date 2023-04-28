import { getAzureAdUser } from '@/api/azureAd';
import { loginRequest } from '@/authConfig';
import { AzureAdUser } from '@/types/azureAd';
import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
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
    data: azureUser
  } = useQuery(
    ['azure-ad-user'],
    async () => {
      const token = (
        await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
        })
      ).accessToken;

      return (await getAzureAdUser(token)).data;
    },
    { retry: false }
  );

  if (isLoading) return <div>Henter bruker fra Azure AD...</div>;
  if (isError) {
    instance.acquireTokenRedirect(loginRequest);
  }

  return <AzureAdContext.Provider value={azureUser}>{children}</AzureAdContext.Provider>;
};
export default AzureAdContextProvider;
