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

const RegisterPageLayout = ({ title, children }: PageLayoutProps) => {
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
        <img className="w-9/12 h-1/5-screen" src={ellipse} alt="" />
        <h1 className="absolute top-1/3 -translate-y-1/3 md:text-3xl text-2xl">{title}</h1>
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
      </div>
      <div className="absolute flex-col gap-[5px] hidden sm:flex items-end place-items-right w-[200px] h-[220px] top-[5px] right-[5px]">
        <SignOutButton />
      </div>
      {children}
    </main>
  );
};

export default RegisterPageLayout;
//            onclick={() => {navigate('/admin');}}
