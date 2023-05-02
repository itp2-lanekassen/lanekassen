import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Route, Routes } from 'react-router-dom';
import AzureAdContextProvider from './context/AzureAdContext';
import CalendarContextProvider from './context/CalendarContext';
import GlobalContextProvider from './context/GlobalContext';
import ModalContextProvider from './context/ModalContext';
import UserContextProvider from './context/UserContext';
import AbsencePage from './pages/AbsencePage';
import AdminPage from './pages/AdminPage';
import CalendarPage from './pages/CalendarPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="bg-primary-contrast">
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AzureAdContextProvider>
          <GlobalContextProvider>
            <UserContextProvider>
              <ModalContextProvider>
                <Routes>
                  <Route path="/registrer-bruker" element={<RegisterPage />} />
                  <Route
                    path="/"
                    element={
                      <CalendarContextProvider>
                        <CalendarPage />
                      </CalendarContextProvider>
                    }
                  />
                  <Route path="/profil" element={<MyPage />} />
                  <Route path="/fravaersside" element={<AbsencePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ModalContextProvider>
            </UserContextProvider>
          </GlobalContextProvider>
        </AzureAdContextProvider>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;
