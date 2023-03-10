import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';
import { loginRequest } from '../authConfig';
import { PageLayout } from './PageLayout';
import { ProfileData } from '../components/ProfileData';
import { callMsGraph } from '../graph';

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response: { accessToken: any }) => {
        callMsGraph(response.accessToken).then((response2) => setGraphData(response2));
      })
      .catch(() => {
        instance.acquireTokenPopup(request).then((response3: { accessToken: any }) => {
          callMsGraph(response3.accessToken).then((response4) => setGraphData(response4));
        });
      });
  }

  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <button
          className="bg-primary-light hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => RequestProfileData()}
        >
          Request profile information
        </button>
      )}
    </>
  );
}

function LoginPage() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate></UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default LoginPage;
