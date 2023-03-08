import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = (loginType: string) => {
    instance.loginRedirect(loginRequest).catch((e: unknown) => {
      console.error(e);
    });
    if (loginType === 'redirect') {
      navigate('/check');
    }
  };
  return (
    <button
      className="bg-primary-light hover:scale-110 text-grey-lightest font-Rubik Medium py-2 px-4 rounded position: relative"
      onClick={() => handleLogin('redirect')}
    >
      Logg inn med Microsoft Azure
    </button>
  );
};
