import { ReactNode, useEffect, useState } from 'react';
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OutsideClickHandler from 'react-outside-click-handler';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  const currentUser = useUserContext();
  const { instance } = useMsal();
  const location = useLocation();
  const navigate = useNavigate();
  const [sideMenuVisibility, setSideMenuVisibility] = useState<string>('-40vw');
  const [indicator, setIndicator] = useState<string[][]>([
    ['primary-contrast', 'primary'],
    ['primary', 'primary-contrast'],
    ['primary', 'primary-contrast'],
    ['primary', 'primary-contrast']
  ]);
  useEffect(() => {
    if (location.pathname === '/') {
      setIndicator([
        ['primary-contrast', 'primary'],
        ['primary', 'primary-contrast'],
        ['primary', 'primary-contrast'],
        ['primary', 'primary-contrast']
      ]);
    } else if (location.pathname === '/profil') {
      setIndicator([
        ['primary', 'primary-contrast'],
        ['primary-contrast', 'primary'],
        ['primary', 'primary-contrast'],
        ['primary', 'primary-contrast']
      ]);
    } else if (location.pathname === '/fravaersside') {
      setIndicator([
        ['primary', 'primary-contrast'],
        ['primary', 'primary-contrast'],
        ['primary-contrast', 'primary'],
        ['primary', 'primary-contrast']
      ]);
    } else if (location.pathname === '/admin') {
      setIndicator([
        ['primary', 'primary-contrast'],
        ['primary', 'primary-contrast'],
        ['primary', 'primary-contrast'],
        ['primary-contrast', 'primary']
      ]);
    }
  }, [location.pathname]);

  function toggleSideMenu() {
    if (sideMenuVisibility === '0vw') {
      setSideMenuVisibility('-40vw');
    } else {
      setSideMenuVisibility('0vw');
    }
  }

  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto pb-6">
      <div className="flex justify-center relative h-1/8 md:h-1/4-screen">
        <img className="w-[85vw] h-[16vw] md:h-[10vw]" src={ellipse} alt="" />
        <h1 className="absolute top-[4vw] -translate-y-1/3 sm:text-3xl text-2xl">{title}</h1>
      </div>
      <button
        onClick={() => {
          toggleSideMenu();
        }}
        className="bg-primary w-[40px] h-[40px] rounded-[5px] absolute top-[5px] right-[5px] block sm:hidden "
      >
        <MenuIcon className="text-primary-contrast" />
      </button>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (sideMenuVisibility === '0vw') {
            toggleSideMenu();
          }
        }}
      >
        <div
          style={{ right: sideMenuVisibility }}
          className={`bg-primary flex flex-col items-center gap-[2vh] h-full pt-[15vh] text-xs sm:hidden fixed top-0 w-[40vw] duration-300 z-50 overflow-hidden`}
        >
          <button
            onClick={() => toggleSideMenu()}
            className="absolute top-[5px] left-0 hover:brightness-125 bg-primary-dark rounded-[5px] ml-[5%] w-[40px] h-[40px]"
          >
            <CloseIcon className="text-primary-contrast"></CloseIcon>
          </button>
          <button
            onClick={() => {
              instance.logoutRedirect({
                postLogoutRedirectUri: '/'
              });
            }}
            className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-primary-contrast text-left"
          >
            <LogoutIcon className="text-primary-contrast ml-[4vw] mr-[2vw]"></LogoutIcon>
            Logg ut
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-primary-contrast text-left"
          >
            <CalendarMonthIcon className="text-primary-contrast ml-[4vw] mr-[2vw]"></CalendarMonthIcon>
            Kalender
          </button>
          <button
            onClick={() => navigate('/profil')}
            className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-primary-contrast text-left"
          >
            <PersonIcon className="text-primary-contrast ml-[4vw] mr-[2vw]"></PersonIcon>
            Profil
          </button>
          <button
            onClick={() => navigate('/fravaersside')}
            className="w-[90%] rounded-[5px] h-[40px] hover:brightness-125 bg-primary-dark text-primary-contrast text-left"
          >
            <EditCalendarIcon className="text-primary-contrast ml-[4vw] mr-[2vw]"></EditCalendarIcon>
            Mine fravær
          </button>
          {currentUser.admin && (
            <button
              onClick={() => navigate('/admin')}
              className="w-[90%] h-[40px] rounded-[5px] bg-primary-dark hover:brightness-125 text-primary-contrast text-left"
            >
              <AdminPanelSettingsIcon className="text-primary-contrast ml-[4vw] mr-[2vw]"></AdminPanelSettingsIcon>
              Admin
            </button>
          )}
        </div>
      </OutsideClickHandler>

      <div className="absolute flex-col gap-[5px] hidden sm:flex items-end place-items-right w-[200px] top-[5px] right-[5px]">
        <SignOutButton />
        <button
          onClick={() => navigate('/')}
          className="group block w-[35px] relative duration-300 hover:w-[180px] h-[35px] rounded-full bg-primary overflow-hidden"
        >
          <div
            className={`bg-${indicator[0][0]} w-[35px] h-[35px] border-solid border-primary border-[3px] rounded-full absolute top-[0px] right-[0px] pt-[3px]`}
          >
            <CalendarMonthIcon className={`text-${indicator[0][1]}`}></CalendarMonthIcon>
          </div>
          <span className="group-hover:block hidden text-primary-contrast">Kalender</span>
        </button>
        <button
          onClick={() => navigate('/profil')}
          className="group block w-[35px] relative duration-300 hover:w-[180px] h-[35px] rounded-full bg-primary overflow-hidden"
        >
          <div
            className={`bg-${indicator[1][0]} w-[35px] h-[35px] border-solid border-primary border-[3px] rounded-full absolute top-[0px] right-[0px] pt-[3px]`}
          >
            <PersonIcon className={`text-${indicator[1][1]}`}></PersonIcon>
          </div>
          <span className="group-hover:block hidden text-primary-contrast">Profil</span>
        </button>
        <button
          onClick={() => navigate('/fravaersside')}
          className="group block w-[35px] relative duration-300 hover:w-[180px] h-[35px] rounded-full bg-primary overflow-hidden"
        >
          <div
            className={`bg-${indicator[2][0]} w-[35px] h-[35px] border-solid border-primary border-[3px] rounded-full absolute top-[0px] right-[0px] pt-[3px]`}
          >
            <EditCalendarIcon className={`text-${indicator[2][1]}`}></EditCalendarIcon>
          </div>
          <span className="group-hover:block hidden text-primary-contrast whitespace-nowrap">
            Mine fravær
          </span>
        </button>
        {currentUser.admin && (
          <button
            onClick={() => {
              navigate('/admin');
            }}
            className="group block w-[35px] relative duration-300 hover:w-[180px] h-[35px] rounded-full bg-primary overflow-hidden"
          >
            <div
              className={`bg-${indicator[3][0]} border-solid border-primary border-[3px] w-[35px] h-[35px] rounded-full absolute top-[0px] right-[0px] pt-[3px] pl-[3px]`}
            >
              <AdminPanelSettingsIcon
                className={`text-${indicator[3][1]}`}
              ></AdminPanelSettingsIcon>
            </div>
            <span className="group-hover:block hidden text-primary-contrast">Admin</span>
          </button>
        )}
      </div>
      {children}
    </main>
  );
};

export default PageLayout;
