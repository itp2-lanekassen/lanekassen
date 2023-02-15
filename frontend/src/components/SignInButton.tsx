import { useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';
import { loginRequest } from '../authConfig';

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.error(e);
      });
    }
  };
  return (
    <Button variant="secondary" className="ml-auto" onClick={() => handleLogin('redirect')}>
      Sign in using Redirect
    </Button>
  );
};
