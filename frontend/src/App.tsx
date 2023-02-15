import { useState } from 'react';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Button } from 'react-bootstrap';
import { loginRequest } from './authConfig';
import { ProfileData } from './components/ProfileData';
import { callMsGraph } from './graph';

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
      .then((response) => {
        callMsGraph(response.accessToken).then((response2) => setGraphData(response2));
      })
      .catch(() => {
        instance.acquireTokenPopup(request).then((response3) => {
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
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information
        </Button>
      )}
    </>
  );
}

function App() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default App;
