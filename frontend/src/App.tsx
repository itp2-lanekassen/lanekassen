import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import UserContextProvider from './context/UserContext';
import FilterContextProvider from './context/FilterContext';
import CalendarPage from './pages/CalendarPage';
import logo from './assets/lanekassen_logo.png';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';
import { Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './context/GlobalContext';
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
    <>
      <UnauthenticatedTemplate>
        <center>
          <img
            src={logo}
            alt="Logo"
            className="object-contain h-14"
            style={{ bottom: '75px', position: 'relative' }}
          />
          <SignInButton />
        </center>
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
    </>
  );
}

export default App;
