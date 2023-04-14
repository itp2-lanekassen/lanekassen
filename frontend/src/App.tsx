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
            <Routes>
              <Route path="/registrer-bruker" element={<FirstTimeRegisterForm />} />
              {/* Denne burde beskyttes slik at man ikke kan navigere hit hvis man har bruker */}
              <Route
                path="/"
                element={
                  <ContextWrapper>
                    <CalendarContextProvider>
                      <CalendarPage />
                    </CalendarContextProvider>
                  </ContextWrapper>
                }
              />
              <Route
                path="/profil"
                element={
                  <ContextWrapper>
                    <MyPage />
                  </ContextWrapper>
                }
              />
              <Route
                path="/fravaersside"
                element={
                  <ContextWrapper>
                    <AbsenceView />
                  </ContextWrapper>
                }
              />
              <Route
                path="/admin"
                element={
                  <ContextWrapper>
                    <AdminPage />
                  </ContextWrapper>
                  /* Må være protected fra ikke-admins */
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </GlobalContextProvider>
        </AzureAdContextProvider>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;
