import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import FilterContextProvider from './context/FilterContext';
import UserContextProvider from './context/UserContext';
import CalendarPage from './pages/CalendarPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './context/GlobalContext';
import { ReactNode } from 'react';
import AzureAdContextProvider from './context/AzureAdContext';
import ModalContextProvider from './context/ModalContext';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';

const ContextWrapper = ({ children }: { children?: ReactNode }) => (
  <UserContextProvider>
    <ModalContextProvider>
      <FilterContextProvider>{children}</FilterContextProvider>
    </ModalContextProvider>
  </UserContextProvider>
);

function App() {
  return (
    <>
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
              <Route path="/profile" element={<MyPage />} />
            </Routes>
          </GlobalContextProvider>
        </AzureAdContextProvider>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
