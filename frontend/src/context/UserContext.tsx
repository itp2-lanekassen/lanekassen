import { useQuery } from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext } from 'react';
import { User } from '@/types/types';
import { loginRequest } from '@/authConfig';
import { useMsal } from '@azure/msal-react';
import { getAzureAdUser } from '@/API/AzureAdAPI';
import { getUserByAzureId } from '@/API/UserAPI';
import { AzureAdUser } from '@/types/azureAd';

interface UserContextProps {
  children?: ReactNode;
}

interface UserContextType {
  azureUser: AzureAdUser;
  currentUser: User;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUserContext = (): UserContextType => useContext(UserContext);

const UserContextProvider: FC<UserContextProps> = (props) => {
  const { instance, accounts } = useMsal();

  const azureId = 'This-is-a-fake-azure-id';

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
    // TODO: use actual id - azureUser.id
    async () => (await getUserByAzureId(azureId)).data,
    {
      retry: false
    }
  );

  if (azureUser.isLoading) return <div>Henter bruker fra Azure AD...</div>;
  if (azureUser.isError) return <div>Noe gikk galt: {String(azureUser.error)}</div>;

  if (currentUser.isLoading) return <div>Laster bruker...</div>;
  if (currentUser.isError) return <div>Noe gikk galt: {String(currentUser.data)}</div>;

  // if (!currentUser.data) redirect('/login');

  return (
    <UserContext.Provider value={{ azureUser: azureUser.data, currentUser: currentUser.data }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
