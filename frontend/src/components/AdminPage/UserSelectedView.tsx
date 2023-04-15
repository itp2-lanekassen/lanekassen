import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId
} from '@/API/DepartmentAPI';
import { getAllTeams } from '@/API/TeamAPI';
import { updateUser } from '@/API/UserAPI';
import { useGlobalContext } from '@/context/GlobalContext';
import { EmploymentType, Team, User } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import DropdownMultiSelect from '../DropdownMultiSelect';
import SubmitButton from '../SubmitButton';
import UserView from './UserView';

/**
 *
 * @param props the user to be shown, the setView() function which changes which view is shown
 * @returns
 */
export default function UserSelectedView(props: {
  selectedUser: User | undefined;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
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
  const [businessAffiliation, setBusinessAffiliation] = useState<string>(
    props.selectedUser!.businessAffiliation
  );
  const [isAdminChecked, setIsAdminChecked] = useState<boolean>(props.selectedUser!.admin);

  // Set fields where data isn't directly available on load
  async function setUserData() {
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
    setUserData();
  }, []);

  // Get all available roles, teams, sections, and subject fields to set dropdown options
  const { data: roles } = useQuery(
    ['roles', { departmentId: selectedDepartment }],
    async () => (await getRolesByDepartmentId(selectedDepartment)).data
  );

  const { data: teams } = useQuery(
    ['teams', { departmentId: selectedDepartment }],
    async () => (await getAllTeams()).data
  );

  const { data: sections } = useQuery(
    ['section', { departmentId: selectedDepartment }],
    async () => (await getSectionsByDepartmentId(selectedDepartment)).data
  );

  const { data: subjectFields } = useQuery(
    ['subject-fields', { departmentId: selectedDepartment }],
    async () => (await getSubjectFieldsByDepartmentId(selectedDepartment)).data
  );

  // Update user to have the data that is set in the input fields. On success, return to the list of all users.
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
        departmentId: selectedDepartment,
        businessAffiliation: businessAffiliation
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries(['current-user']);
      alert('Brukeren ble oppdatert!');
      props.setView(<UserView />);
    }
  });

  const handleAdminCheckbox = () => {
    setIsAdminChecked(!isAdminChecked);
  };

  return (
    <div>
      <SubmitButton handleClick={() => props.setView(<UserView />)} buttonText={'Tilbake'} />
      <div className="grid grid-cols-my-page mx-auto w-max gap-4 mt-16 place-items-baseline">
        <p className="font-bold"> Navn: </p>
        <p className=" w-full">
          {props.selectedUser?.firstName} {props.selectedUser?.lastName}{' '}
        </p>

        <p className="font-bold"> E-post: </p>
        <p className=" w-full">{props.selectedUser?.email}</p>

        <p className="font-bold"> Virksomhet: </p>
        <input
          className="w-full rounded-full p-2 bg-white text-primary border-1 border-primary-light"
          type="text"
          value={businessAffiliation}
          onChange={(e) => setBusinessAffiliation(e.target.value)}
        />

        <p className="font-bold"> Admin: </p>
        <input
          className="flex w-5"
          type="checkbox"
          checked={isAdminChecked}
          onChange={handleAdminCheckbox}
        />

        <p className="font-bold"> Ansattforhold: </p>
        <Dropdown
          placeholder="Ansattforhold"
          options={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ label: type, value: i }))}
          onChange={(e) => setSelectedEmploymentType(e)}
          value={selectedEmploymentType}
          isDisabled={false}
        />

        <p className="font-bold"> Avdeling: </p>
        <Dropdown
          placeholder="Avdeling"
          options={departments.map((d) => ({
            label: d.name,
            value: d.departmentId
          }))}
          onChange={(e) => setSelectedDepartment(e)}
          value={selectedDepartment}
          isDisabled={false}
        />

        <p className="font-bold"> Seksjon: </p>
        <Dropdown
          placeholder="Seksjon"
          options={(sections || []).map((s) => ({
            label: s.name,
            value: s.sectionId
          }))}
          onChange={(e) => setSelectedSection(e)}
          value={selectedSection}
          isDisabled={false}
        />

        <p className="font-bold"> Fagområde: </p>
        <DropdownMultiSelect
          placeholder="Fagområde"
          options={(subjectFields || []).map((s) => ({
            label: s.name,
            value: s.subjectFieldId
          }))}
          onChange={(e) => setSelectedSubjectFields(e)}
          value={selectedSubjectFields}
          isDisabled={false}
        />

        <p className="font-bold"> Team: </p>
        <DropdownMultiSelect
          placeholder="Team"
          options={(teams || []).map((t: Team) => ({
            label: t.name,
            value: t.teamId
          }))}
          onChange={(e) => setSelectedTeams(e)}
          value={selectedTeams}
          isDisabled={false}
        />

        <p className="font-bold"> Rolle: </p>
        <DropdownMultiSelect
          placeholder="Rolle"
          options={(roles || []).map((r) => ({
            label: r.name,
            value: r.roleId
          }))}
          onChange={(e) => setSelectedRoles(e)}
          value={selectedRoles}
          isDisabled={false}
        />

        <div className="flex justify-center gap-2 col-span-2 w-full">
          <>
            <SubmitButton
              buttonText="Oppdater bruker"
              handleClick={userToBeUpdated}
              disabled={false}
              disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
            />
          </>
        </div>
      </div>
    </div>
  );
}
