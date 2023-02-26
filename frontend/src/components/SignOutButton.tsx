import { useMsal } from '@azure/msal-react';

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
      className="bg-primary-light hover:scale-110 text-grey-lightest font-Rubik Medium py-2 px-4 rounded position: relative"
      onClick={() => handleLogout('redirect')}
    >
      Logg ut
    </button>
  );
};
