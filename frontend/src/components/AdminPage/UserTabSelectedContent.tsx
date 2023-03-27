import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '@/API/DepartmentAPI';
import { deleteUser, getAllUsers, updateUser } from '@/API/UserAPI';
import { useGlobalContext } from '@/context/GlobalContext';
import { EmploymentType, Role, SubjectField, Team, User } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import DropdownMultiSelect from '../DropdownMultiSelect';
import SubmitButton from '../SubmitButton';

export default function UserTabSelectedContent(props: {
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setClickedUserId: Dispatch<SetStateAction<number>>;
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
}) {
  const queryClient = useQueryClient();
  const { departments } = useGlobalContext();

  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(
    props.selectedUser!.employmentType
  );
  const [selectedDepartment, setSelectedDepartment] = useState<number>(
    props.selectedUser!.departmentId
  );
  const [selectedSection, setSelectedSection] = useState<number>(props.selectedUser!.sectionId);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [isAdminChecked, setIsAdminChecked] = useState<boolean>(props.selectedUser!.admin);

  async function loadUserData() {
    const listTeam: number[] = [];
    const listSubjectField: number[] = [];
    const listRole: number[] = [];

    props.selectedUser!.teams?.forEach((team) => listTeam.push(team.teamId));
    setSelectedTeams(listTeam);

    props.selectedUser!.subjectFields?.forEach((subjectField) =>
      listSubjectField.push(subjectField.subjectFieldId)
    );
    setSelectedSubjectFields(listSubjectField);

    props.selectedUser!.roles?.forEach((role) => listRole.push(role.roleId));
    setSelectedRoles(listRole);
  }

  useEffect(() => {
    loadUserData();
  }, [props.selectedUser]);

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
      updateUser(props.selectedUser!.userId, {
        azureId: props.selectedUser!.azureId,
        firstName: props.selectedUser!.firstName,
        lastName: props.selectedUser!.lastName,
        email: props.selectedUser!.email,
        admin: isAdminChecked,
        employmentType: selectedEmploymentType,
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

  const handleDeleteProfileClick = () => {
    const confirmDelete = confirm('Er du sikker på at du vil slette denne profilen?');
    if (confirmDelete) {
      deleteUser(props.selectedUser!.userId).then(async () => {
        props.setUsers((await getAllUsers()).data);
        handleGoBack();
      });
    }
  };

  const handleGoBack = () => {
    props.setSelectedUser(undefined);
    props.setClickedUserId(-1);
  };

  const handleAdminCheckbox = () => {
    setIsAdminChecked(!isAdminChecked);
  };

  return (
    <div>
      <SubmitButton handleClick={handleGoBack} buttonText={'Tilbake'} />
      <div className="grid grid-cols-my-page mx-auto w-max gap-4 place-items-center mt-16">
        <p className="font-bold"> Navn: </p>
        <p className=" w-full">
          {props.selectedUser?.firstName} {props.selectedUser?.lastName}{' '}
        </p>

        <p className="font-bold"> E-post: </p>
        <p className=" w-full">{props.selectedUser?.email}</p>

        <p className="font-bold"> Admin: </p>
        <input type="checkbox" checked={isAdminChecked} onChange={handleAdminCheckbox} />

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
}
