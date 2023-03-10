import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import UserContextProvider from './context/UserContext';
import FilterContextProvider from './context/FilterContext';
import CalendarPage from './pages/CalendarPage';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';
import { Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './context/GlobalContext';
import LoginPage from './pages/LoginPage';

import { ReactNode } from 'react';
import AzureAdContextProvider from './context/AzureAdContext';
import ModalContextProvider from './context/ModalContext';

const ContextWrapper = ({ children }: { children?: ReactNode }) => (
  <UserContextProvider>
    <ModalContextProvider>
      <FilterContextProvider>{children}</FilterContextProvider>
    </ModalContextProvider>
  </UserContextProvider>
);

function App() {
  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto">
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AzureAdContextProvider>
          <GlobalContextProvider>
            <Routes>
              <Route path="/register" element={<FirstTimeRegisterForm />} />
              <Route
                path="/"
                element={
                  <ContextWrapper>
                    <CalendarPage />
                  </ContextWrapper>
                }
              />
            </Routes>
          </GlobalContextProvider>
        </AzureAdContextProvider>
      </AuthenticatedTemplate>
    </main>
  );
}

export default App;
