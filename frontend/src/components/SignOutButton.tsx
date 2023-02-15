import { useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';

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
    <Button variant="secondary" className="ml-auto" onClick={() => handleLogout('redirect')}>
      Sign out using Redirect
    </Button>
  );
};
