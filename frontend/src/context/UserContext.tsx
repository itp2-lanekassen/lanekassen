import { useQuery } from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserByAzureId } from '../API/UserAPI';
import { User } from '../types/types';
import { useAzureAdContext } from './AzureAdContext';
import NotFoundPage from '@/pages/NotFoundPage';

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
  const location = useLocation();
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
    return <Navigate to="/registrer-bruker" />;
  }
  if (location.pathname === '/registrer-bruker' && currentUser) {
    return <Navigate to="/" />;
  }
  if (location.pathname !== '/registrer-bruker' && !currentUser) {
    return <Navigate to="/registrer-bruker" />;
  }
  if (location.pathname === '/admin' && !currentUser.admin) {
    return <NotFoundPage />;
  }

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
