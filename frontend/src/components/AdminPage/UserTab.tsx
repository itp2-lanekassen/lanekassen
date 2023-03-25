import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '@/API/DepartmentAPI';
import { deleteUser, getAllUsers, getUserById, updateUser } from '@/API/UserAPI';
import { useGlobalContext } from '@/context/GlobalContext';
import { EmploymentType, Role, SubjectField, Team, User } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import DropdownMultiSelect from '../DropdownMultiSelect';
import SubmitButton from '../SubmitButton';
import SearchBar from './SearchBar';
import UserRow from './UserRow';

const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon'];

export default function UserTab() {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[]>();
  const [clickedUserId, setClickedUserId] = useState<number>(-1);
  const [selectedUser, setSelectedUser] = useState<User>();
  const { departments } = useGlobalContext();

  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(
    selectedUser!.employmentType
  );
  const [selectedDepartment, setSelectedDepartment] = useState<number>(selectedUser!.departmentId);
  const [selectedSection, setSelectedSection] = useState<number>(selectedUser!.sectionId);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>(
    selectedUser!.subjectFields.map((sf: SubjectField) => sf.subjectFieldId)
  );
  const [selectedTeams, setSelectedTeams] = useState<number[]>(
    selectedUser!.teams.map((t: Team) => t.teamId)
  );
  const [selectedRoles, setSelectedRoles] = useState<number[]>(
    selectedUser!.roles.map((r: Role) => r.roleId)
  );

  const { data: roles } = useQuery(
    ['roles', { departmentId: selectedDepartment }],
    async () => (await getRolesByDepartmentId(selectedDepartment)).data
  );

  const { data: teams } = useQuery(
    ['teams', { departmentId: selectedDepartment }],
    async () => (await getTeamsByDepartmentId(selectedDepartment)).data
  );

  const { data: sections } = useQuery(
    ['section', { departmentId: selectedDepartment }],
    async () => (await getSectionsByDepartmentId(selectedDepartment)).data
  );

  const { data: subjectFields } = useQuery(
    ['subject-fields', { departmentId: selectedDepartment }],
    async () => (await getSubjectFieldsByDepartmentId(selectedDepartment)).data
  );

  const { mutate: userToBeUpdated } = useMutation({
    mutationFn: () =>
      updateUser(selectedUser!.userId, {
        azureId: selectedUser!.azureId,
        firstName: selectedUser!.firstName,
        lastName: selectedUser!.lastName,
        email: selectedUser!.email,
        admin: selectedUser!.admin,
        employmentType: selectedUser!.employmentType,
        sectionId: selectedSection,
        subjectFields: selectedSubjectFields,
        roles: selectedRoles,
        teams: selectedTeams,
        departmentId: selectedDepartment
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['current-user']);
    }
  });

  async function loadUsers() {
    setUsers((await getAllUsers()).data);
  }

  async function getSelectedUser() {
    setSelectedUser((await getUserById(clickedUserId)).data);
  }

  const handleDeleteProfileClick = () => {
    const confirmDelete = confirm('Er du sikker på at du vil slette profilen din?');
    if (confirmDelete) {
      deleteUser(selectedUser!.userId).then(() => {
        //navigate('/registrer-bruker');
        console.log('hdhddh');
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    getSelectedUser();
  }, [clickedUserId]);

  if (clickedUserId >= 0) {
    return (
      <div>
        <div className="grid grid-cols-my-page mx-auto w-max gap-4 place-items-center mt-16">
          <p className="font-bold"> Navn: </p>
          <p className=" w-full">
            {selectedUser?.firstName} {selectedUser?.lastName}{' '}
          </p>

          <p className="font-bold"> E-post: </p>
          <p className=" w-full">{selectedUser?.email}</p>

          <p className="font-bold"> Ansattforhold: </p>
          <Dropdown
            placeholder="Ansattforhold"
            listOfOptions={Object.keys(EmploymentType)
              .filter((type) => isNaN(Number(type)))
              .map((type, i) => ({ name: type, id: i }))}
            handleChange={(e) => setSelectedEmploymentType(e)}
            value={selectedEmploymentType}
            isDisabled={false}
          />

          <p className="font-bold"> Avdeling: </p>
          <Dropdown
            placeholder="Avdeling"
            listOfOptions={departments.map((d: { name: string; departmentId: number }) => ({
              name: d.name,
              id: d.departmentId
            }))}
            handleChange={(e) => setSelectedDepartment(e)}
            value={selectedDepartment}
            isDisabled={false}
          />

          <p className="font-bold"> Seksjon: </p>
          <Dropdown
            placeholder="Seksjon"
            listOfOptions={(sections || []).map((s: { name: string; sectionId: number }) => ({
              name: s.name,
              id: s.sectionId
            }))}
            handleChange={(e) => setSelectedSection(e)}
            value={selectedSection}
            isDisabled={false}
          />

          <p className="font-bold"> Fagområde: </p>
          <DropdownMultiSelect
            placeholder="Fagområde"
            listOfOptions={(subjectFields || []).map(
              (s: { name: string; subjectFieldId: number }) => ({
                name: s.name,
                id: s.subjectFieldId
              })
            )}
            handleChange={(e) => setSelectedSubjectFields(e)}
            value={selectedSubjectFields}
            isDisabled={false}
          />

          <p className="font-bold"> Team: </p>
          <DropdownMultiSelect
            placeholder="Team"
            listOfOptions={(teams || []).map((t: { name: string; teamId: number }) => ({
              name: t.name,
              id: t.teamId
            }))}
            handleChange={(e) => setSelectedTeams(e)}
            value={selectedTeams}
            isDisabled={false}
          />

          <p className="font-bold"> Rolle: </p>
          <DropdownMultiSelect
            placeholder="Rolle"
            listOfOptions={(roles || []).map((r: { name: string; roleId: number }) => ({
              name: r.name,
              id: r.roleId
            }))}
            handleChange={(e) => setSelectedRoles(e)}
            value={selectedRoles}
            isDisabled={false}
          />

          <div className="flex items-center gap-2 col-span-2">
            <>
              <SubmitButton
                buttonText="Oppdater bruker"
                handleClick={userToBeUpdated}
                disabled={false}
                disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
              />
              <SubmitButton
                disabled={false}
                disabledTitle={'Slett bruker'}
                buttonText={'Slett bruker'}
                handleClick={handleDeleteProfileClick}
              />
            </>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <SearchBar />
        <table className="ml-10">
          <tbody>
            <tr>
              {tableHeaders.map((header) => (
                <th className="p-3 pr-5" key={header}>
                  {header}
                </th>
              ))}
            </tr>
            {users?.map((user) => (
              <UserRow setClickedUser={setClickedUserId} key={user.azureId} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * Må gjøres:
 * fikse at add-knappen fungerer (route, add skjema, add tilbakeknapp)
 * plassere komponenter riktig
 * adde søkefunksjonalitet til søkefeltet
 * kunne klikke på en ansatt og åpne skjema for å redigere (med rett info)
 */

/**
 * Current problems:
 * den kommer bare til å rendre 1 gang, så det if else funker nok ikke
 * den setter states med en gang, så selectedUser er null
 */
