import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import GlobalContextProvider from './context/GlobalContext';
import UserContextProvider from './context/UserContext';
import FilterContextProvider from './context/FilterContext';
import CalendarPage from './pages/CalendarPage';
import logo from './assets/lanekassen_logo.png';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';

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
        <UserContextProvider>
          <GlobalContextProvider>
            <FilterContextProvider>
              {/* Router view here */}
              <CalendarPage />
            </FilterContextProvider>
          </GlobalContextProvider>
        </UserContextProvider>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
