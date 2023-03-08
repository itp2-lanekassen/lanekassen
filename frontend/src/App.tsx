import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import GlobalContextProvider from './context/GlobalContext';
import UserContextProvider from './context/UserContext';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
      <UnauthenticatedTemplate>
        <MyPage />
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
