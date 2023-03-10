import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { updateUser } from '../API/UserAPI';
import ellipse from '../assets/ellipse.png';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { EmploymentType } from '../types/types';
/**
 *
 * @returns component that is the page for first-time registering
 */
export default function MyPage() {
  const queryClient = useQueryClient();

  const { currentUser } = useUserContext();
  const { departments } = useGlobalContext();

  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(-1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

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
      updateUser(currentUser.userId, {
        azureId: currentUser.azureId,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
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
      // redirect('/calendar)
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

  const handleEditClick = () => {
    if (isDropdownDisabled == true) {
      setIsDropdownDisabled(false);
    } else {
      setIsDropdownDisabled(true);
    }
  };

  // const handleDeleteProfileClick = () => {

  return (
    <div className="max-w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="sm:w-[70vw] mobile:w-[90vw] sm:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Profil</h1>
      </div>
      <button
        className="bg-primary-light hover:scale-110 text-grey-lightest font-Rubik Medium py-2 px-4 rounded position: relative"
        onClick={() => handleEditClick()}
      >
        Rediger info
      </button>
      <div className="flex flex-1 flex-col items-center tablet:mt-20 mobile:mt-40">
        <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ name: type, id: i }))}
          handleChange={(e) => setSelectedEmploymentType(e)}
          value={selectedEmploymentType}
          isDisabled={isDropdownDisabled}
        />
        <Dropdown
          placeholder="Avdeling"
          listOfOptions={departments.map((d: { name: any; departmentId: any }) => ({
            name: d.name,
            id: d.departmentId
          }))}
          handleChange={(e) => setSelectedDepartment(e)}
          value={selectedDepartment}
          isDisabled={isDropdownDisabled}
        />
        <Dropdown
          placeholder="Seksjon"
          listOfOptions={(sections || []).map((s: { name: any; sectionId: any }) => ({
            name: s.name,
            id: s.sectionId
          }))}
          handleChange={(e) => setSelectedSection(e)}
          value={selectedSection}
          isDisabled={isDropdownDisabled}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          listOfOptions={(subjectFields || []).map((s: { name: any; subjectFieldId: any }) => ({
            name: s.name,
            id: s.subjectFieldId
          }))}
          handleChange={(e) => setSelectedSubjectFields(e)}
          value={selectedSubjectFields}
          isDisabled={isDropdownDisabled}
        />
        <DropdownMultiSelect
          placeholder="Team"
          listOfOptions={(teams || []).map((t: { name: any; teamId: any }) => ({
            name: t.name,
            id: t.teamId
          }))}
          handleChange={(e) => setSelectedTeams(e)}
          value={selectedTeams}
          isDisabled={isDropdownDisabled}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          listOfOptions={(roles || []).map((r: { name: any; roleId: any }) => ({
            name: r.name,
            id: r.roleId
          }))}
          handleChange={(e) => setSelectedRoles(e)}
          value={selectedRoles}
          isDisabled={isDropdownDisabled}
        />
        <button
          className="bg-primary-light hover:scale-110 text-grey-lightest font-Rubik Medium py-2 px-4 rounded position: relative"
          // onClick={() => handleDeleteProfileClick()}
        >
          Slett bruker
        </button>

        <SubmitButton
          buttonText="Registrer deg"
          handleClick={userToBeUpdated}
          disabled={isDisabled}
          disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
        />
      </div>
    </div>
  );
}
