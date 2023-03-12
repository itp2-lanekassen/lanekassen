import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { updateUser, deleteUser } from '../API/UserAPI';
import ellipse from '../assets/ellipse.png';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { EmploymentType, Role, SubjectField, Team } from '../types/types';
import { SignOutButton } from '../components/SignOutButton';
import { useNavigate } from 'react-router-dom';
/**
 *
 * @returns component that is the personal profile of the user, where the user can edit their information and delete their account
 */
export default function MyPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentUser = useUserContext();
  const { departments } = useGlobalContext();

  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(
    currentUser.employmentType
  );
  const [selectedDepartment, setSelectedDepartment] = useState<number>(currentUser.departmentId);
  const [selectedSection, setSelectedSection] = useState<number>(currentUser.sectionId);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>(
    currentUser.subjectFields.map((sf: SubjectField) => sf.subjectFieldId)
  );
  const [selectedTeams, setSelectedTeams] = useState<number[]>(
    currentUser.teams.map((t: Team) => t.teamId)
  );
  const [selectedRoles, setSelectedRoles] = useState<number[]>(
    currentUser.roles.map((r: Role) => r.roleId)
  );

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
        admin: currentUser.admin,
        employmentType: currentUser.employmentType,
        sectionId: selectedSection,
        subjectFields: selectedSubjectFields,
        roles: selectedRoles,
        teams: selectedTeams,
        departmentId: selectedDepartment
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['current-user']);
      setIsDropdownDisabled(true);
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
  /*   useEffect(() => {
      if (selectedDepartment !== -1) {
        setSelectedSection(-1);
        setSelectedSubjectFields([]);
        setSelectedTeams([]);
        setSelectedRoles([]);
      }
    }, [selectedDepartment]); */

  const handleDeleteProfileClick = () => {
    const confirmDelete = confirm('Er du sikker på at du vil slette profilen din?');
    if (confirmDelete) {
      deleteUser(currentUser.userId).then(() => {
        navigate('/register');
      });
    }
  };

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

      <div className="absolute top-10 right-10 flex justify-end">
        <SignOutButton />
      </div>

      <div className="absolute top-10 left-10 flex justify-end">
        <SubmitButton
          disabled={false}
          disabledTitle={'Tilbake'}
          buttonText={'Tilbake til kalender'}
          handleClick={() => {
            navigate('/');
          }}
        />
      </div>

      <div className="grid grid-cols-my-page mx-auto w-max gap-4 place-items-center mt-16">
        <p className="font-bold"> Navn: </p>
        <p className=" w-full">
          {currentUser.firstName} {currentUser.lastName}{' '}
        </p>

        <p className="font-bold"> E-post: </p>
        <p className=" w-full">{currentUser.email}</p>

        <p className="font-bold"> Ansattforhold: </p>
        <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ name: type, id: i }))}
          handleChange={(e) => setSelectedEmploymentType(e)}
          value={selectedEmploymentType}
          isDisabled={isDropdownDisabled}
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
          isDisabled={isDropdownDisabled}
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
          isDisabled={isDropdownDisabled}
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
          isDisabled={isDropdownDisabled}
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
          isDisabled={isDropdownDisabled}
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
          isDisabled={isDropdownDisabled}
        />

        <div className="flex items-center gap-2 col-span-2">
          {isDropdownDisabled ? (
            <SubmitButton
              buttonText="Rediger bruker"
              handleClick={() => setIsDropdownDisabled(false)}
              disabled={!isDropdownDisabled}
              disabledTitle={'Disabled'}
            />
          ) : (
            <>
              <SubmitButton
                buttonText="Avbryt redigering"
                handleClick={() => setIsDropdownDisabled(true)}
                disabled={isDropdownDisabled}
                disabledTitle={'Disabled'}
              />
              <SubmitButton
                buttonText="Oppdater bruker"
                handleClick={userToBeUpdated}
                disabled={isDisabled}
                disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
              />
              <SubmitButton
                disabled={isDropdownDisabled}
                disabledTitle={'Slett bruker'}
                buttonText={'Slett bruker'}
                handleClick={handleDeleteProfileClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
