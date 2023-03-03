import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { PageLayout } from './components/PageLayout';
import logo from './assets/lanekassen_logo.png';
import { SignInButton } from './components/SignInButton';
import UserContextProvider from './context/UserContext';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <PageLayout>
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
          <CalendarPage />
        </UserContextProvider>
      </AuthenticatedTemplate>
    </PageLayout>
  );
}

export default App;
