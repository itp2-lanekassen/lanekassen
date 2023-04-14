import { useGlobalContext } from '../context/GlobalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId
} from '../API/DepartmentAPI';
import { getUserByAzureId, postUser } from '../API/UserAPI';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { EmploymentType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useAzureAdContext } from '../context/AzureAdContext';
import { SignOutButton } from '../components/SignOutButton';
import { getAllTeams } from '../API/TeamAPI';
import RegisterPageLayout from '../components/RegisterPageLayout';

export default function FirstTimeRegisterForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const azureUser = useAzureAdContext();
  const { departments, sections: allSections } = useGlobalContext();

  // Set default values for dropdowns based on Azure AD data
  let defaultDepartment = -1;
  if (azureUser.department) {
    const tmp = azureUser.department.split(' (');
    const departmentName = tmp[0];
    const department = departments.find((d) => d.name === departmentName);
    if (department) {
      defaultDepartment = department.departmentId;
    }
  }

  let defaultSection = -1;
  if (azureUser.officeLocation) {
    const section = allSections.find((s) => s.name === azureUser.officeLocation);
    if (section) {
      defaultSection = section.sectionId;
    }
  }

  const [selectedDepartment, setSelectedDepartment] = useState<number>(
    defaultDepartment ? defaultDepartment : -1
  );
  const [selectedSection, setSelectedSection] = useState<number>(
    defaultSection ? defaultSection : -1
  );
  const [selectedBusinessAffiliation, setSelectedBusinessAffiliation] =
    useState<string>('Lånekassen');
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(-1);
  const [isDisabled, setIsDisabled] = useState(true);

  const { data: roles } = useQuery(['roles', { departmentId: selectedDepartment }], async () =>
    selectedDepartment === -1 ? [] : (await getRolesByDepartmentId(selectedDepartment)).data
  );

  const { data: teams } = useQuery(['teams'], async () => (await getAllTeams()).data);

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
        businessAffiliation: selectedBusinessAffiliation,
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
    },
    onError: (error) => {
      alert(error);
    }
  });

  // Validate that required fields are filled out
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

  // Redirect to home if user is already registered
  useEffect(() => {
    async function checkIfUserIsRegistered() {
      const user = await getUserByAzureId(azureUser.id);
      if (user) {
        navigate('/');
      }
    }

    checkIfUserIsRegistered();
  }, [azureUser.id, navigate]);

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
    <RegisterPageLayout title="Registrering">
      <div className="grid grid-cols-my-page mx-auto w-max gap-4 place-items-center mb-4">
        <p className="font-bold"> Navn: </p>
        <p className="w-full text-primary">
          {azureUser.givenName} {azureUser.surname}
        </p>
        <p className="font-bold"> E-post: </p>
        <p className="w-full text-primary">{azureUser.mail}</p>
        <p className="font-bold"> Virksomhetstilhørighet: </p>
        <input
          type={'text'}
          value={selectedBusinessAffiliation}
          placeholder="Virksomhetstilhørighet"
          className="w-full border-1 border-primary-light rounded-full p-2 text-primary"
          onChange={(e) => setSelectedBusinessAffiliation(e.target.value)}
        />
      </div>
      <div className="flex flex-col mx-auto w-1/4 gap-4">
        <Dropdown
          placeholder="Ansattforhold"
          options={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ label: type, value: i }))}
          onChange={setSelectedEmploymentType}
          value={selectedEmploymentType}
        />
        <Dropdown
          placeholder="Avdeling"
          options={departments.map((d) => ({ label: d.name, value: d.departmentId }))}
          onChange={setSelectedDepartment}
          value={selectedDepartment}
        />
        <Dropdown
          placeholder="Seksjon"
          options={(sections || []).map((s) => ({
            label: s.name,
            value: s.sectionId
          }))}
          onChange={setSelectedSection}
          value={selectedSection}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          options={(subjectFields || []).map((s) => ({
            label: s.name,
            value: s.subjectFieldId
          }))}
          onChange={setSelectedSubjectFields}
          value={selectedSubjectFields}
        />
        <DropdownMultiSelect
          placeholder="Team"
          options={(teams || []).map((t) => ({
            label: t.name,
            value: t.teamId
          }))}
          onChange={setSelectedTeams}
          value={selectedTeams}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          options={(roles || []).map((r) => ({
            label: r.name,
            value: r.roleId
          }))}
          onChange={setSelectedRoles}
          value={selectedRoles}
        />

        <SubmitButton
          buttonText="Registrer deg"
          className="mx-auto"
          handleClick={registerUser}
          disabled={isDisabled}
          disabledTitle={
            'Fyll ut virksomhetstilhørighet, ansattforhold, avdeling, seksjon og fagområde'
          }
        />
      </div>
    </RegisterPageLayout>
  );
}
