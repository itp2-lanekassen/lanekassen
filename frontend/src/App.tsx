import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import FilterContextProvider from './context/FilterContext';
import GlobalContextProvider from './context/GlobalContext';
import UserContextProvider from './context/UserContext';
import CalendarPage from './pages/CalendarPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <UserContextProvider>
          <GlobalContextProvider>
            <FilterContextProvider>
              <MyPage />
            </FilterContextProvider>
          </GlobalContextProvider>
        </UserContextProvider>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
