import * as msal from '@azure/msal-browser';
import axios from 'axios';
/* import { msalConfig } from '@/authConfig'; */

const backendUrl = 'https://localhost:7184/';
/* const msalApp = new msal.PublicClientApplication(msalConfig); */

const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read']
};

function MyComponent() {
  const handleClick = async () => {
    try {
      //const loginResponse = await msalApp.loginPopup(loginRequest);
      //const accessToken = loginResponse.accessToken;
      //const azureId = loginResponse.account?.homeAccountId;
      const fakeId = 'This-is-a-fake-azure-id'; // John Doe has this AzureId in the database
      //console.log(azureId);

      axios
        .get(`${backendUrl}/User/azure/`, { params: { fakeId }, withCredentials: true })
        .then((response) => {
          const userExists = response.data.exists;
          if (userExists) {
            console.log('User exists');
            console.log(response.data.user);
            // TODO: navigate to home page
          } else {
            console.error('User not registered');
            // TODO: navigate to registration page
          }
        })
        .catch((error) => {
          console.error(error);
          // TODO: handle error
        });
    } catch (error) {
      console.error(error);
      // TODO: handle error
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Sign In</button>
    </div>
  );
}

export default MyComponent;
