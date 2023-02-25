import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest).catch((e: unknown) => {
        console.error(e);
      });
    }
  };
  return (
    <button
      className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => handleLogin('redirect')}
    >
      Logg inn med Microsoft Azure
    </button>
    //Put in button
    // <Button> className="ml-auto" onClick={() => handleLogin('redirect')}>
    //   Sign in using Redirect
    // </Button>
  );
};
