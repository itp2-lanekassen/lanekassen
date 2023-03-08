import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import UserContextProvider from './context/UserContext';
import FilterContextProvider from './context/FilterContext';
import CalendarPage from './pages/CalendarPage';
import logo from './assets/lanekassen_logo.png';
import FirstTimeRegisterForm from './pages/FirstTimeRegisterForm';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalContextProvider from './context/GlobalContext';
<<<<<<< HEAD
=======
import CheckUserExist from './pages/CheckUserExist';
>>>>>>> ed806e8 (Add a page for redirecting)

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
          <HashRouter>
            <Routes>
              <Route path="/" element={<SignInButton />}></Route>
            </Routes>
          </HashRouter>
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
