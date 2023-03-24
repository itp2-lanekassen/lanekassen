import { useGlobalContext } from '../context/GlobalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { getUserByAzureId, postUser } from '../API/UserAPI';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { EmploymentType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useAzureAdContext } from '../context/AzureAdContext';
import { SignOutButton } from '../components/SignOutButton';
import PageLayout from '@/components/PageLayout';

export default function FirstTimeRegisterForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const azureUser = useAzureAdContext();
  const { departments } = useGlobalContext();

  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(-1);
  const [isDisabled, setIsDisabled] = useState(true);

  const { data: roles } = useQuery(['roles', { departmentId: selectedDepartment }], async () =>
    selectedDepartment === -1 ? [] : (await getRolesByDepartmentId(selectedDepartment)).data
  );

  const { data: teams } = useQuery(['teams', { departmentId: selectedDepartment }], async () =>
    selectedDepartment === -1 ? [] : (await getTeamsByDepartmentId(selectedDepartment)).data
  );

  const { data: sections } = useQuery(['section', { departmentId: selectedDepartment }], async () =>
    selectedDepartment === -1 ? [] : (await getSectionsByDepartmentId(selectedDepartment)).data
  );

  const { data: subjectFields } = useQuery(
    ['subject-fields', { departmentId: selectedDepartment }],
    async () =>
      selectedDepartment === -1
        ? []
        : (await getSubjectFieldsByDepartmentId(selectedDepartment)).data
  );

  const { mutate: registerUser } = useMutation({
    mutationFn: () =>
      postUser({
        azureId: azureUser.id,
        firstName: azureUser.givenName,
        lastName: azureUser.surname,
        email: azureUser.mail,
        admin: false,
        sectionId: selectedSection,
        departmentId: selectedDepartment,
        subjectFields: selectedSubjectFields,
        teams: selectedTeams,
        roles: selectedRoles,
        employmentType: selectedEmploymentType
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['current-user']);
      navigate('/');
    }
  });

  // Validate that required fields are filled out
  useEffect(() => {
    setIsDisabled(
      selectedDepartment === -1 ||
        selectedSection === -1 ||
        selectedSubjectFields.length === 0 ||
        selectedEmploymentType === -1
    );
  }, [selectedDepartment, selectedSection, selectedSubjectFields, selectedEmploymentType]);

  async function checkIfUserIsRegistered() {
    const user = await getUserByAzureId(azureUser.id);
    if (user) {
      navigate('/');
    }
  }

  // Redirect to home if user is already registered
  useEffect(() => {
    checkIfUserIsRegistered();
  }, []);

  // Fetch data when department is selected
  useEffect(() => {
    if (selectedDepartment !== -1) {
      setSelectedSection(-1);
      setSelectedSubjectFields([]);
      setSelectedTeams([]);
      setSelectedRoles([]);
    }
  }, [selectedDepartment]);

  return (
    <PageLayout title="Registrering">
      <div className="absolute top-10 left-10 flex justify-end">
        <SignOutButton />
      </div>
      <div className="grid grid-cols-my-page mx-auto w-max gap-4 place-items-center mb-4">
        <p className="font-bold"> Navn: </p>
        <p className=" w-full">
          {azureUser.givenName} {azureUser.surname}
        </p>
        <p className="font-bold"> E-post: </p>
        <p className=" w-full">{azureUser.mail}</p>
      </div>
      <div className="grid mx-auto w-max gap-4 place-items-center">
        <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ name: type, id: i }))}
          handleChange={(e) => setSelectedEmploymentType(e)}
          value={selectedEmploymentType}
          isDisabled={false}
        />
        <Dropdown
          placeholder="Avdeling"
          listOfOptions={departments.map((d) => ({ name: d.name, id: d.departmentId }))}
          handleChange={(e) => setSelectedDepartment(e)}
          value={selectedDepartment}
          isDisabled={false}
        />
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

        <SubmitButton
          buttonText="Registrer deg"
          handleClick={registerUser}
          disabled={isDisabled}
          disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
        />
      </div>
    </PageLayout>
  );
}
