import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import UserContextProvider from './context/UserContext';
import FilterContextProvider from './context/FilterContext';
import CalendarPage from './pages/CalendarPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './context/GlobalContext';
import { ReactNode } from 'react';
import AzureAdContextProvider from './context/AzureAdContext';
import ModalContextProvider from './context/ModalContext';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';
import PageNotFound from './pages/PageNotFound';

const ContextWrapper = ({ children }: { children?: ReactNode }) => (
  <UserContextProvider>
    <ModalContextProvider>
      <FilterContextProvider>{children}</FilterContextProvider>
    </ModalContextProvider>
  </UserContextProvider>
);

function App() {
  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto">
      <UnauthenticatedTemplate>
        <LoginPage />
        <LoginPage />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AzureAdContextProvider>
          <GlobalContextProvider>
            <Routes>
              <Route path="/register" element={<FirstTimeRegisterForm />} />
              {/* Denne burde beskyttes slik at man ikke kan navigere hit hvis man har bruker */}
              <Route
                path="/"
                element={
                  <ContextWrapper>
                    <CalendarPage />
                  </ContextWrapper>
                }
              />
              <Route
                path="/mypage"
                element={
                  <ContextWrapper>
                    <MyPage />
                  </ContextWrapper>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </GlobalContextProvider>
        </AzureAdContextProvider>
      </AuthenticatedTemplate>
    </main>
  );
}

export default App;
