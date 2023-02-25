import * as msal from '@azure/msal-browser';
import axios from 'axios';
/* import { msalConfig } from '@/authConfig'; */

const backendUrl = 'https://localhost:7184';
//const backendUrl = 'http://localhost:5178';
/* const msalApp = new msal.PublicClientApplication(msalConfig); */

const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read']
};

function MyComponent() {
  const deleteUser = async () => {
    const userId = 666969;

    axios
      .delete(`${backendUrl}/User/${userId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateUser = async () => {
    const userToBeUpdated = {
      azureId: 'Updated user',
      firstName: 'updated',
      lastName: 'post',
      email: 'test@doe.no',
      employmentType: 1,
      admin: false,
      sectionId: 706969,
      subjectField: 'IT',
      subjectFields: [0],
      roles: [0],
      teams: [0],
      absences: [0]
    };

    const userId = 666969;

    axios
      .put(`${backendUrl}/User/${userId}`, userToBeUpdated)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postUser = async () => {
    const user = {
      azureId: 'New-user-azure-id',
      firstName: 'Test',
      lastName: 'post',
      email: 'test@doe.no',
      employmentType: 1,
      admin: false,
      sectionId: 706969,
      subjectField: 'IT',
      subjectFields: [0],
      roles: [0],
      teams: [0],
      absences: [0]
    };

    axios
      .post(`${backendUrl}/User`, user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUser = async () => {
    try {
      //const loginResponse = await msalApp.loginPopup(loginRequest);
      //const accessToken = loginResponse.accessToken;
      //const azureId = loginResponse.account?.homeAccountId;
      const fakeId = 'This-is-a-fake-azure-id'; // John Doe has this AzureId in the database
      //console.log(azureId);

      axios
        .get(`${backendUrl}/User/azure/${fakeId}`)
        .then((response) => {
          const data = response.data;
          if (data != null || data != undefined) {
            console.log('User exists');
            console.log(data);
            // TODO: navigate to home page
          } else {
            console.error('Data is null or undefined');
          }
        })
        .catch((error) => {
          console.log('User not found');
          console.error(error);
          // TODO: navigate to registration page
        });
    } catch (error) {
      console.log('Error logging in');
      console.error(error);
      // TODO: handle error
    }
  };

  return (
    <div>
      <h1>Test page. Gå i console.</h1>
      <button onClick={getUser}>Sign In</button>
      <br />
      <br />
      <button onClick={postUser}>Post user</button>
      <br />
      <br />
      <button onClick={updateUser}>Update user</button>
      <br />
      <br />
      <button onClick={deleteUser}>Delete user</button>
    </div>
  );
}

export default MyComponent;
