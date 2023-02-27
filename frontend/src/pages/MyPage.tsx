import { useEffect, useState } from 'react';
import { deleteUser, getUserById, updateUser } from '../API/UserAPI';
import { SignOutButton } from '../components/SignOutButton';
import { Department, Role, Section, SubjectField, Team, User } from '../types/types';

export const MyPage = () => {
  // hooks for user information
  const [user, setUser] = useState<User>();
  const [azureId, setAzureId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [employmentType, setEmploymentType] = useState<number>(0);
  const [sectionId, setSectionId] = useState<number>(0);
  const [subjectFieldId, setSubjectFieldId] = useState<number>(0);

  const [role, setRole] = useState<Role | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [subjectField, setSubjectField] = useState<SubjectField | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);

  // get user information from backend
  async function getMyUserInfo() {
    const userInfo = await getUserById(666969).then((res) => res.data);
    setUser(userInfo);
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setAdmin(userInfo.admin);
    setRole(userInfo.roles);
    setTeam(userInfo.teams);
    setSection(userInfo.sectionId);
    setSubjectField(userInfo.subjectFieldId);
  }

  function updateUserToDatabase() {
    const userToBeUpdated = {
      azureId: azureId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      roles: role,
      teams: team,
      admin: admin,
      sectionId: sectionId,
      subjectFieldId: subjectFieldId,
      employmentType: employmentType,
      subjectFields: subjectField
    };

    updateUser(666969, userToBeUpdated); // bytte id
  }

  function deleteUserFromDatabase() {
    // TODO: Validate if user wants to delete account first

    deleteUser(666969); // bytte id
    // TODO: Redirect til login
  }

  useEffect(() => {
    getMyUserInfo();
  }, []);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-grey-lighter">
      <center>
        <h1>Min side</h1>
        <div>
          <p>
            Navn: {firstName} {lastName}
          </p>
          <p>Epost: {email}</p>
          <p>Rolle: {role}</p>
          <p>Team: {team}</p>
          <p>Avdeling: {section}</p>
          <p>Fagfelt: {subjectField}</p>
          <p>Avdeling: {department}</p>
        </div>
        <button onClick={updateUserToDatabase}>Oppdater bruker</button>
        <SignOutButton />
      </center>
    </main>
  );
};
