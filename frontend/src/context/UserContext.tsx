import { useQuery } from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAzureAdContext } from './AzureAdContext';
import { User } from '../types/types';
import { getUserByAzureId } from '../API/UserAPI';

interface UserContextProps {
  children?: ReactNode;
}

const UserContext = createContext<User | undefined>(undefined);

export const useUserContext = (): User => {
  const ctx = useContext(UserContext);

  if (!ctx) throw new Error('UserContext must be used within its provider');

  return ctx;
};

const UserContextProvider: FC<UserContextProps> = ({ children }) => {
  const azureUser = useAzureAdContext();
  const {
    isLoading,
    isError,
    data: currentUser
  } = useQuery(['current-user'], async () => (await getUserByAzureId(azureUser.id)).data, {
    retry: false
  });

  if (isLoading) return <div>Laster bruker...</div>;
  if (isError) {
    return <Navigate to="/register" />;
  }

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
