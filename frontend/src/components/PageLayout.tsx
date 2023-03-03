import { useIsAuthenticated } from '@azure/msal-react';
import logo from '../assets/lanekassen_logo.png';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-grey-lighter">
      <center>
        <img
          src={logo}
          alt="Logo"
          className="object-contain h-14"
          style={{ bottom: '75px', position: 'relative' }}
        />
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </center>
    </main>
  );
};
