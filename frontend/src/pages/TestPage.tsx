import * as msal from '@azure/msal-browser';
import axios from 'axios';
/* import { msalConfig } from '@/authConfig'; */
import { backendUrl } from '../types/types';
import {
  getAllUsers,
  getUserById,
  getUserByAzureId,
  postUser,
  updateUser,
  deleteUser
} from '../API/UserAPI';

import {
  getAllAbsenceTypes,
  getAbsenceTypeById,
  postAbsenceType,
  updateAbsenceType,
  deleteAbsenceType
} from '../API/AbsenceTypeAPI';

import {
  getAllAbsences,
  getAbsenceById,
  postAbsence,
  updateAbsence,
  deleteAbsence
} from '../API/AbsenceAPI';

import {
  getAllDepartments,
  getDepartmentById,
  postDepartment,
  updateDepartment,
  deleteDepartment
} from '../API/DepartmentAPI';

import {
  getAllSections,
  getSectionById,
  postSection,
  updateSection,
  deleteSection
} from '../API/SectionAPI';

import { getAllTeams, getTeamById, postTeam, updateTeam, deleteTeam } from '../API/TeamAPI';

import { getAllRoles, getRoleById, postRole, updateRole, deleteRole } from '../API/RoleAPI';

import {
  getAllSubjectFields,
  getSubjectFieldById,
  postSubjectField,
  updateSubjectField,
  deleteSubjectField
} from '../API/SubjectFieldAPI';

//const backendUrl = 'https://localhost:7184';
//const backendUrl = 'http://localhost:5178';
/* const msalApp = new msal.PublicClientApplication(msalConfig); */

const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read']
};

function MyComponent() {
  const deleteUser2 = async () => {
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

  const updateUser2 = async () => {
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

  const postUser2 = async () => {
    const user = {
      azureId: 'New-user-azure-id',
      firstName: 'Test',
      lastName: 'post',
      email: 'test@doe.no',
      employmentType: 0,
      admin: false,
      sectionId: 706969,
      subjectFields: [716969],
      roles: [736970],
      teams: [726972],
      absences: []
    };
    postUser(user);
  };

  const getUser2 = async () => {
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

  const getUser3 = async () => {
    const test = import.meta.env.VITE_API_URL;
    console.log(test);

    const userId = 'string';
    const user = await getUserById(666969);

    if (user != null || user != undefined) {
      console.log('User exists');
      console.log(user.data);
    } else {
      console.error('Data is null or undefined');
    }
  };

  return (
    <div>
      <h1>Gå i console. Utfør knappene i rekkefølge og sjekk i databasen.</h1>
      <br />
      <p>ps. Husk å sette opp databasen på nytt først. Er hardkodet inn data. </p>
      <button onClick={getUser3}>Get user</button>
      <br />
      <br />
      <button onClick={postUser2}>Post user</button>
      <br />
      <br />
      {/*       <button onClick={updateUser}>Update user</button>
      <br />
      <br />
      <button onClick={deleteUser}>Delete user</button> */}
    </div>
  );
}

export default MyComponent;
