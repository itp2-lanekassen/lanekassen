import PageLayout from '@/components/PageLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../API/UserAPI';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import { SignOutButton } from '../components/SignOutButton';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { EmploymentType, Role, SubjectField, Team } from '../types/types';
/**
 *
 * @returns component that is the personal profile of the user, where the user can edit their information and delete their account
 */
export default function MyPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentUser = useUserContext();
  const { departments, roles, teams, subjectFields, sections } = useGlobalContext();

  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(
    currentUser.employmentType
  );
  const [selectedBusinessAffiliation, setSelectedBusinessAffiliation] = useState<string>(
    currentUser.businessAffiliation
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

  const { mutate: userToBeUpdated } = useMutation({
    mutationFn: () =>
      updateUser(currentUser.userId, {
        azureId: currentUser.azureId,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        admin: currentUser.admin,
        businessAffiliation: selectedBusinessAffiliation,
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
    },
    onError: () => {
      alert('Feil ved oppdatering av bruker');
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

  const handleDeleteProfileClick = () => {
    const confirmDelete = confirm('Er du sikker på at du vil slette profilen din?');
    if (confirmDelete) {
      deleteUser(currentUser.userId).then(() => {
        navigate('/registrer-bruker');
      });
    }
  };

  return (
    <PageLayout title="Profil">
      <div className="absolute top-10 right-10 flex justify-end">
        <SignOutButton />
      </div>
      <div className="absolute bottom-10 right-10 flex justify-end">
        <SubmitButton
          rounded={'4px rounded'}
          disabled={false}
          disabledTitle={'Slett bruker'}
          buttonText={'Slett bruker'}
          handleClick={handleDeleteProfileClick}
          hover={'hover:scale-110'}
        />
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

      {currentUser.admin && (
        <div className="absolute top-18 left-10 flex justify-end">
          <SubmitButton
            disabled={false}
            disabledTitle={'admin'}
            buttonText={'Til adminsiden'}
            handleClick={() => {
              navigate('/admin');
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-my-page mx-auto w-max gap-4 place-items-center">
        <p className="font-bold"> Navn: </p>
        <p className=" w-full text-primary">
          {currentUser.firstName} {currentUser.lastName}
        </p>

        <p className="font-bold"> E-post: </p>
        <p className=" w-full text-primary">{currentUser.email}</p>
        <p className="font-bold"> Virksomhetstilhørighet: </p>
        <input
          type={'text'}
          value={selectedBusinessAffiliation}
          disabled={isDropdownDisabled}
          placeholder="Virksomhetstilhørighet"
          className={`w-full rounded-full p-2 bg-white text-primary ${
            isDropdownDisabled
              ? 'disabled: bg-disabled-blue border-0'
              : 'border-1 border-primary-light'
          }`}
          onChange={(e) => setSelectedBusinessAffiliation(e.target.value)}
        />

        <p className="font-bold"> Ansattforhold: </p>
        <Dropdown
          className="w-full"
          placeholder="Ansattforhold"
          options={Object.keys(EmploymentType)
            .filter((type) => isNaN(Number(type)))
            .map((type, i) => ({ label: type, value: i }))}
          onChange={setSelectedEmploymentType}
          value={selectedEmploymentType}
          isDisabled={isDropdownDisabled}
        />

        <p className="font-bold"> Avdeling: </p>
        <Dropdown
          className="w-full"
          placeholder="Avdeling"
          options={departments.map((d) => ({
            label: d.name,
            value: d.departmentId
          }))}
          onChange={setSelectedDepartment}
          value={selectedDepartment}
          isDisabled={isDropdownDisabled}
        />

        <p className="font-bold"> Seksjon: </p>
        <Dropdown
          className="w-full"
          placeholder="Seksjon"
          options={(sections || []).map((s) => ({
            label: s.name,
            value: s.sectionId
          }))}
          onChange={setSelectedSection}
          value={selectedSection}
          isDisabled={isDropdownDisabled}
        />

        <p className="font-bold"> Fagområde: </p>
        <DropdownMultiSelect
          className="w-full"
          placeholder="Fagområde"
          options={(subjectFields || []).map((s) => ({
            label: s.name,
            value: s.subjectFieldId
          }))}
          onChange={setSelectedSubjectFields}
          value={selectedSubjectFields}
          isDisabled={isDropdownDisabled}
        />

        <p className="font-bold"> Team: </p>
        <DropdownMultiSelect
          className="w-full"
          placeholder="Team"
          options={(teams || []).map((t) => ({
            label: t.name,
            value: t.teamId
          }))}
          onChange={setSelectedTeams}
          value={selectedTeams}
          isDisabled={isDropdownDisabled}
        />

        <p className="font-bold"> Rolle: </p>
        <DropdownMultiSelect
          className="w-full"
          placeholder="Rolle"
          options={(roles || []).map((r) => ({
            label: r.name,
            value: r.roleId
          }))}
          onChange={setSelectedRoles}
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
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
