import { getUserByAzureId } from '@/API/UserAPI';
import { loginRequest } from '@/authConfig';
import { callMsGraph } from '@/graph';
import { useMsal } from '@azure/msal-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckUserExist() {
  const [id, setId] = useState<string>('');
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const request = {
    ...loginRequest,
    account: accounts[0]
  };

  // Silently acquires an access token which is then attached to a request for Microsoft Graph data
  instance
    .acquireTokenSilent(request)
    .then((response: { accessToken: any }) => {
      callMsGraph(response.accessToken).then((response2) => setId(response2.id));
    })
    .catch((e) => {
      instance.acquireTokenPopup(request).then((response3: { accessToken: any }) => {
        callMsGraph(response3.accessToken).then((response4) => setId(response4.id));
      });
    });

  try {
    async () => await getUserByAzureId(id);
    //console.log(id);
    navigate('/');
  } catch {
    //console.log("ajajhahj")
    navigate('/register');
  }
  return (
    <div>
      <h2 className="card-title">Welcome</h2>
    </div>
  );
}
