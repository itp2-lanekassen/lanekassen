import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import GlobalContextProvider from './context/GlobalContext';
import UserContextProvider from './context/UserContext';
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
            {/* Router view here */}
            <FirstTimeRegisterForm />
          </GlobalContextProvider>
        </UserContextProvider>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
