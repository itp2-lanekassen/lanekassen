import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AbsenceView } from './components/AbsenceView';
import AzureAdContextProvider from './context/AzureAdContext';
import CalendarContextProvider from './context/CalendarContext';
import GlobalContextProvider from './context/GlobalContext';
import ModalContextProvider from './context/ModalContext';
import UserContextProvider from './context/UserContext';
import AdminPage from './pages/AdminPage';
import CalendarPage from './pages/CalendarPage';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import PageNotFound from './pages/PageNotFound';

const ContextWrapper = ({ children }: { children?: ReactNode }) => (
  <UserContextProvider>
    <ModalContextProvider>{children}</ModalContextProvider>
  </UserContextProvider>
);

function App() {
  return (
    <div className="bg-primary-contrast">
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AzureAdContextProvider>
          <GlobalContextProvider>
            <ContextWrapper>
              <Routes>
                <Route path="/registrer-bruker" element={<FirstTimeRegisterForm />} />
                <Route
                  path="/"
                  element={
                    <CalendarContextProvider>
                      <CalendarPage />
                    </CalendarContextProvider>
                  }
                />
                <Route path="/profil" element={<MyPage />} />
                <Route path="/fravaersside" element={<AbsenceView />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </ContextWrapper>
          </GlobalContextProvider>
        </AzureAdContextProvider>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;
