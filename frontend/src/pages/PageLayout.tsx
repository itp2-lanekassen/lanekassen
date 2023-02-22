import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from '../components/SignOutButton';

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: { children: any }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <div>
        <a className="navbar-brand" href="/">
          MSAL React Tutorial
        </a>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </div>
      <h5>
        <center>Welcome to the Microsoft Authentication Library For React Tutorial</center>
      </h5>
      <br />
      <br />
      {props.children}
    </>
  );
};
