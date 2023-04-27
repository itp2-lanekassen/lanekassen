import { useMsal } from '@azure/msal-react';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    if (logoutType === 'redirect') {
      instance.logoutRedirect({
        postLogoutRedirectUri: '/'
      });
    }
  };

  return (
    <button
      onClick={() => handleLogout('redirect')}
      className="group block w-[35px] relative duration-300 hover:w-[180px] h-[35px] rounded-full bg-primary overflow-hidden"
    >
      <span className="bg-primary w-[35px] h-[35px] rounded-full absolute top-[0px] right-[0px] pt-[5.5px]">
        <LogoutIcon className="text-white"></LogoutIcon>
      </span>
      <span className="group-hover:block hidden text-white">Logg ut</span>
    </button>
  );
};
