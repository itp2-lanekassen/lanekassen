import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import ellipse from '../assets/ellipse.png';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { postUser } from '../API/UserAPI';
import { EmploymentType } from '../types/types';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAzureAdContext } from '@/context/AzureAdContext';

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
    <div className="max-w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="sm:w-[70vw] mobile:w-[90vw] sm:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Registrering</h1>
      </div>
      <div className="flex flex-1 flex-col items-center tablet:mt-20 mobile:mt-40">
        <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ name: type, id: i }))}
          handleChange={(e) => setSelectedEmploymentType(e)}
          value={selectedEmploymentType}
        />
        <Dropdown
          placeholder="Avdeling"
          listOfOptions={departments.map((d) => ({ name: d.name, id: d.departmentId }))}
          handleChange={(e) => setSelectedDepartment(e)}
          value={selectedDepartment}
        />
        <Dropdown
          placeholder="Seksjon"
          listOfOptions={(sections || []).map((s) => ({ name: s.name, id: s.sectionId }))}
          handleChange={(e) => setSelectedSection(e)}
          value={selectedSection}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          listOfOptions={(subjectFields || []).map((s) => ({ name: s.name, id: s.subjectFieldId }))}
          handleChange={(e) => setSelectedSubjectFields(e)}
          value={selectedSubjectFields}
        />
        <DropdownMultiSelect
          placeholder="Team"
          listOfOptions={(teams || []).map((t) => ({ name: t.name, id: t.teamId }))}
          handleChange={(e) => setSelectedTeams(e)}
          value={selectedTeams}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          listOfOptions={(roles || []).map((r) => ({ name: r.name, id: r.roleId }))}
          handleChange={(e) => setSelectedRoles(e)}
          value={selectedRoles}
        />

        <SubmitButton
          buttonText="Registrer deg"
          handleClick={registerUser}
          disabled={isDisabled}
          disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
        />
      </div>
    </div>
  );
}
