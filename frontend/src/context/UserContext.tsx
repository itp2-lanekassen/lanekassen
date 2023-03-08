import { useQuery } from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext } from 'react';
import { User } from '@/types/types';
import { loginRequest } from '@/authConfig';
import { useMsal } from '@azure/msal-react';
import { getAzureAdUser } from '@/API/AzureAdAPI';
import { getUserByAzureId } from '@/API/UserAPI';
import { AzureAdUser } from '@/types/azureAd';
import { useNavigate } from 'react-router-dom';

interface UserContextProps {
  children?: ReactNode;
}

interface UserContextType {
  azureUser: AzureAdUser;
  currentUser: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
  const ctx = useContext(UserContext);

  if (!ctx) throw new Error('UserContext must be used within its provider');

  return ctx;
};

const UserContextProvider: FC<UserContextProps> = (props) => {
  const { instance, accounts } = useMsal();

  const azureUser = useQuery(
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

  const currentUser = useQuery(
    ['current-user'],
    async () => (azureUser.data ? (await getUserByAzureId(azureUser.data.id)).data : ({} as User)),
    {
      retry: false
    }
  );

  if (azureUser.isLoading) return <div>Henter bruker fra Azure AD...</div>;
  if (azureUser.isError) return <div>Noe gikk galt: {String(azureUser.error)}</div>;

  if (currentUser.isLoading) return <div>Laster bruker...</div>;
  if (currentUser.isError) return <div>Noe gikk galt: {String(currentUser.error)}</div>;

  // if (!currentUser.data) redirect('/login');

  return (
    <UserContext.Provider value={{ azureUser: azureUser.data, currentUser: currentUser.data }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
