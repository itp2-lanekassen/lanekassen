import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId
} from '@/api/department';
import { getAllTeams } from '@/api/team';
import { updateUser } from '@/api/user';
import { useGlobalContext } from '@/context/GlobalContext';
import { EmploymentType, Team, User } from '@/types/interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';
import UserView from './UserView';
import { useModalContext } from '@/context/ModalContext';

/**
 *
 * @param props the user to be shown, the setView() function which changes which view is shown
 * @returns
 */
export default function UserSelectedView(props: {
  selectedUser: User;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();
  const { openMessageBox } = useModalContext();

  const { departments } = useGlobalContext();
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(
    props.selectedUser.employmentType
  );
  const [selectedDepartment, setSelectedDepartment] = useState<number>(
    props.selectedUser.departmentId
  );
  const [selectedSection, setSelectedSection] = useState<number>(props.selectedUser.sectionId);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedBusinessAffiliation, setSelectedBusinessAffiliation] = useState<string>(
    props.selectedUser.businessAffiliation
  );
  const [isAdminChecked, setIsAdminChecked] = useState<boolean>(props.selectedUser.admin);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    // Set fields where data isn't directly available on load
    const listTeam: number[] = [];
    const listSubjectField: number[] = [];
    const listRole: number[] = [];

    props.selectedUser.teams?.forEach((team) => listTeam.push(team.teamId));
    setSelectedTeams(listTeam);

    props.selectedUser.subjectFields?.forEach((subjectField) =>
      listSubjectField.push(subjectField.subjectFieldId)
    );
    setSelectedSubjectFields(listSubjectField);

    props.selectedUser.roles?.forEach((role) => listRole.push(role.roleId));
    setSelectedRoles(listRole);
  }, [props.selectedUser]);

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
      updateUser(props.selectedUser.userId, {
        azureId: props.selectedUser.azureId,
        firstName: props.selectedUser.firstName,
        lastName: props.selectedUser.lastName,
        email: props.selectedUser.email,
        admin: isAdminChecked,
        employmentType: selectedEmploymentType,
        sectionId: selectedSection,
        subjectFields: selectedSubjectFields,
        roles: selectedRoles,
        teams: selectedTeams,
        departmentId: selectedDepartment,
        businessAffiliation: selectedBusinessAffiliation
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries(['current-user']);
      openMessageBox('Brukeren ble oppdatert!');
      props.setView(<UserView />);
    }
  });

  const handleAdminCheckbox = () => {
    setIsAdminChecked(!isAdminChecked);
  };

  useEffect(() => {
    setIsDisabled(
      selectedDepartment === -1 ||
        selectedSection === -1 ||
        selectedSubjectFields.length === 0 ||
        selectedEmploymentType === -1 ||
        selectedBusinessAffiliation === ''
    );
  }, [
    selectedDepartment,
    selectedSection,
    selectedSubjectFields,
    selectedEmploymentType,
    selectedBusinessAffiliation
  ]);

  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <h3 className="text-xl">Oppdater bruker</h3>
      </div>
      <div className="grid grid-cols-my-page mx-auto w-max gap-4 mt-4 place-items-baseline">
        <p className="font-bold"> Navn: </p>
        <p className=" w-full">
          {props.selectedUser?.firstName} {props.selectedUser?.lastName}{' '}
        </p>

        <p className="font-bold"> E-post: </p>
        <p className=" w-full">{props.selectedUser?.email}</p>

        <p className="font-bold"> Virksomhet: </p>
        <input
          className="w-80 rounded-full p-2 bg-primary-contrast text-primary border-1 border-primary-light"
          type="text"
          value={selectedBusinessAffiliation}
          onChange={(e) => setSelectedBusinessAffiliation(e.target.value)}
        />

        <p className="font-bold" onClick={() => setIsAdminChecked(!isAdminChecked)}>
          Admin:
        </p>
        <input
          className="flex w-5"
          type="checkbox"
          checked={isAdminChecked}
          onChange={handleAdminCheckbox}
        />

        <p className="font-bold"> Ansattforhold: </p>
        <Dropdown
          className="w-80"
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
          className="w-80"
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
          className="w-80"
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
          className="w-80"
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
          className="w-80"
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
          className="w-80"
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
          <SubmitButton
            buttonText="Oppdater bruker"
            handleClick={userToBeUpdated}
            disabled={isDisabled}
            disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
          />
          <button
            className="px-4 py-2 rounded-full bg-primary text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light"
            onClick={() => {
              props.setView(<UserView />);
            }}
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
}
