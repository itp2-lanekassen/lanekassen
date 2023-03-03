import { useQuery } from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext } from 'react';
import { User } from '@/types';
import { loginRequest } from '@/authConfig';
import { useMsal } from '@azure/msal-react';
import { getAzureAdUser } from '@/API/AzureAdAPI';
import { getUserByAzureId } from '@/API/UserAPI';
import { AzureAdUser } from '@/types/azureAd';

interface UserContextProps {
  children?: ReactNode;
}

interface UserContextType {
  azureUser?: AzureAdUser;
  currentUser?: User;
}

const UserContext = createContext<UserContextType>({});

export const useUserContext = (): UserContextType => useContext(UserContext);

const UserContextProvider: FC<UserContextProps> = (props) => {
  const { instance, accounts } = useMsal();

  const azureId = 'This-is-a-fake-azure-id';

  const { data: azureUser } = useQuery(
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

  const {
    isLoading,
    isError,
    data: currentUser
  } = useQuery(
    ['current-user'],
    // Should be azureUser.id
    async () => (await getUserByAzureId(azureId)).data,
    {
      retry: false
    }
  );

  if (isLoading) return <div>Loading...</div>;

  // handle some redirect
  if (isError) window.location.replace('/login');

  // TODO: if !isLoading && !data redirect to register

  return (
    <UserContext.Provider value={{ azureUser, currentUser }}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
