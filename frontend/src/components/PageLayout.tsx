import { ReactNode, useState } from 'react';
import ellipse from '../assets/ellipse.png';
import PersonIcon from '@mui/icons-material/Person';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SignOutButton } from '../components/SignOutButton';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMsal } from '@azure/msal-react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  const currentUser = useUserContext();
  const navigate = useNavigate();
  const [sideMenuVisibility, setSideMenuVisibility] = useState<string>('-40vw');
  const { instance } = useMsal();

  function toggleSideMenu() {
    if (sideMenuVisibility === '0vw') {
      setSideMenuVisibility('-40vw');
    } else {
      setSideMenuVisibility('0vw');
    }
  }

  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto pb-6">
      <div className="flex justify-center relative h-1/4-screen">
        <img className="w-[85vw] h-[16vw] md:h-[10vw]" src={ellipse} alt="" />
        <h1 className="absolute top-[4vw] -translate-y-1/3 sm:text-3xl text-2xl">{title}</h1>
      </div>
      <button
        onClick={() => toggleSideMenu()}
        className="bg-primary w-[40px] h-[40px] rounded-[5px] absolute top-[5px] right-[5px] block sm:hidden "
      >
        <MenuIcon className="text-white" />
      </button>
      <div
        style={{ left: sideMenuVisibility }}
        className={`bg-primary flex flex-col items-center gap-[2vh] pt-[10vw] h-full text-xs sm:hidden fixed top-0 w-[40vw] duration-300 z-10 overflow-hidden`}
      >
        <button
          onClick={() => {
            instance.logoutRedirect({
              postLogoutRedirectUri: '/'
            });
          }}
          className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-white text-left"
        >
          <LogoutIcon className="text-white ml-[4vw] mr-[2vw]"></LogoutIcon>
          Logg ut
        </button>
        <button
          onClick={() => navigate('/profil')}
          className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-white text-left"
        >
          <PersonIcon className="text-white ml-[4vw] mr-[2vw]"></PersonIcon>
          Profil
        </button>
        <button
          onClick={() => navigate('/fravaersside')}
          className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-white text-left"
        >
          <EditCalendarIcon className="text-white ml-[4vw] mr-[2vw]"></EditCalendarIcon>
          Dine fravær
        </button>
        {currentUser.admin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-[90%] h-[40px] rounded-[5px] bg-primary-dark hover:brightness-125 text-white text-left"
          >
            <AdminPanelSettingsIcon className="text-white ml-[4vw] mr-[2vw]"></AdminPanelSettingsIcon>
            Admin
          </button>
        )}
      </div>
      <div className="absolute flex-col gap-[5px] hidden sm:flex items-end place-items-right w-[200px] h-[220px] top-[5px] right-[5px]">
        <SignOutButton />
        <button
          onClick={() => navigate('/profil')}
          className="group block w-[40px] relative duration-300 hover:w-[180px] h-[40px] rounded-full bg-primary overflow-hidden"
        >
          <div className="bg-primary w-[40px] h-[40px] rounded-full absolute top-[0px] right-[0px] p-[8px]">
            <PersonIcon className="text-white"></PersonIcon>
          </div>
          <span className="group-hover:block hidden text-white">Profil</span>
        </button>
        <button
          onClick={() => navigate('/fravaersside')}
          className="group block w-[40px] relative duration-300 hover:w-[180px] h-[40px] rounded-full bg-primary overflow-hidden"
        >
          <div className="bg-primary w-[40px] h-[40px] rounded-full absolute top-[0px] right-[0px] p-[8px]">
            <EditCalendarIcon className="text-white"></EditCalendarIcon>
          </div>
          <span className="group-hover:block hidden text-white whitespace-nowrap">Dine fravær</span>
        </button>
        {currentUser.admin && (
          <button
            onClick={() => {
              navigate('/admin');
            }}
            className="group block w-[40px] relative duration-300 hover:w-[180px] h-[40px] rounded-full bg-primary overflow-hidden"
          >
            <div className="bg-primary w-[40px] h-[40px] rounded-full absolute top-[0px] right-[0px] pt-[8px] pl-[3px]">
              <AdminPanelSettingsIcon className="text-white"></AdminPanelSettingsIcon>
            </div>
            <span className="group-hover:block hidden text-white">Admin</span>
          </button>
        )}
      </div>
      <button
        onClick={() => toggleSideMenu()}
        className="bg-primary w-[40px] h-[40px] rounded-[5px] absolute top-[5px] right-[5px] block sm:hidden "
      >
        <MenuIcon className="text-white" />
      </button>
      <div
        style={{ left: sideMenuVisibility }}
        className={`bg-primary flex flex-col items-center gap-[2vh] pt-[10vw] h-full text-xs sm:hidden fixed top-0 w-[40vw] duration-300 z-10 overflow-hidden`}
      >
        <button
          onClick={() => {
            instance.logoutRedirect({
              postLogoutRedirectUri: '/'
            });
          }}
          className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-white text-left"
        >
          <LogoutIcon className="text-white ml-[4vw] mr-[2vw]"></LogoutIcon>
          Logg ut
        </button>
        <button
          onClick={() => navigate('/profil')}
          className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-white text-left"
        >
          <PersonIcon className="text-white ml-[4vw] mr-[2vw]"></PersonIcon>
          Profil
        </button>
        <button
          onClick={() => navigate('/fravaersside')}
          className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-white text-left"
        >
          <EditCalendarIcon className="text-white ml-[4vw] mr-[2vw]"></EditCalendarIcon>
          Dine fravær
        </button>
        {currentUser.admin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-[90%] h-[40px] rounded-[5px] bg-primary-dark hover:brightness-125 text-white text-left"
          >
            <AdminPanelSettingsIcon className="text-white ml-[4vw] mr-[2vw]"></AdminPanelSettingsIcon>
            Admin
          </button>
        )}
      </div>
      <div className="absolute flex-col gap-[5px] hidden sm:flex items-end place-items-right w-[200px] h-[220px] top-[5px] right-[5px]">
        <SignOutButton />
        <button
          onClick={() => navigate('/profil')}
          className="group block w-[40px] relative duration-300 hover:w-[180px] h-[40px] rounded-full bg-primary overflow-hidden"
        >
          <div className="bg-primary w-[40px] h-[40px] rounded-full absolute top-[0px] right-[0px] p-[8px]">
            <PersonIcon className="text-white"></PersonIcon>
          </div>
          <span className="group-hover:block hidden text-white">Profil</span>
        </button>
        <button
          onClick={() => navigate('/fravaersside')}
          className="group block w-[40px] relative duration-300 hover:w-[180px] h-[40px] rounded-full bg-primary overflow-hidden"
        >
          <div className="bg-primary w-[40px] h-[40px] rounded-full absolute top-[0px] right-[0px] p-[8px]">
            <EditCalendarIcon className="text-white"></EditCalendarIcon>
          </div>
          <span className="group-hover:block hidden text-white whitespace-nowrap">Dine fravær</span>
        </button>
        {currentUser.admin && (
          <button
            onClick={() => {
              navigate('/admin');
            }}
            className="group block w-[40px] relative duration-300 hover:w-[180px] h-[40px] rounded-full bg-primary overflow-hidden"
          >
            <div className="bg-primary w-[40px] h-[40px] rounded-full absolute top-[0px] right-[0px] pt-[8px] pl-[3px]">
              <AdminPanelSettingsIcon className="text-white"></AdminPanelSettingsIcon>
            </div>
            <span className="group-hover:block hidden text-white">Admin</span>
          </button>
        )}
      </div>
      {children}
    </main>
  );
};

export default PageLayout;
//            onclick={() => {navigate('/admin');}}
