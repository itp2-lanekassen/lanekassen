import { getAllTeams } from '@/api/team';
import ErrorAlert from '@/components/Alert';
import PageLayout from '@/pages/PageLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId
} from '../api/department';
import { updateUser } from '../api/user';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { EmploymentType, Role, SubjectField, Team } from '../types/interfaces';
import { useModalContext } from '@/context/ModalContext';

/**
 *
 * @returns component that is the personal profile of the user, where the user can edit their information and delete their account
 */
export default function MyPage() {
  const queryClient = useQueryClient();
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');
  const { openMessageBox } = useModalContext();

  const currentUser = useUserContext();
  const { departments } = useGlobalContext();

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

  const { data: roles } = useQuery(
    ['roles', { departmentId: selectedDepartment }],
    async () => (await getRolesByDepartmentId(selectedDepartment)).data
  );

  const { data: teams } = useQuery(['teams'], async () => (await getAllTeams()).data);

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
    onError: () => openMessageBox('Feil ved oppdatering av bruker')
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

  useEffect(() => {
    if (isDisabled) {
      setErrorAlertMessage('Du må fylle ut virksomhet, avdeling, seksjon og fagområde');
      setErrorAlertOpen(true);
    } else {
      setErrorAlertOpen(false);
    }
  }, [isDisabled]);

  const handleCancelEdit = () => {
    setSelectedBusinessAffiliation(currentUser.businessAffiliation);
    setSelectedDepartment(currentUser.departmentId);
    setSelectedSection(currentUser.sectionId);
    setSelectedSubjectFields(
      currentUser.subjectFields.map((sf: SubjectField) => sf.subjectFieldId)
    );
    setSelectedTeams(currentUser.teams.map((t: Team) => t.teamId));
    setSelectedRoles(currentUser.roles.map((r: Role) => r.roleId));
    setSelectedEmploymentType(currentUser.employmentType);
    setIsDropdownDisabled(true);
  };

  // Fetch data when department is selected
  useEffect(() => {
    if (selectedDepartment !== currentUser.departmentId) {
      setSelectedSection(-1);
      setSelectedSubjectFields([]);
      setSelectedRoles([]);
    }
  }, [selectedDepartment, currentUser.departmentId]);

  return (
    <PageLayout title="Profil">
      <div className="grid grid-cols-my-page-2 grid-rows-my-page-3 mx-4 gap-4 [&>*:nth-child(odd)]:text-center [&>*:nth-child(even)]:text-left place-items-baseline float-right">
        <p className="font-bold"> Navn: </p>
        <p className="w-full text-primary">
          {currentUser.firstName} {currentUser.lastName}
        </p>

        <p className="font-bold"> E-post: </p>
        <p className="w-full text-primary overflow-hidden whitespace-wrap text-ellipsis">
          {currentUser.email}
        </p>
        <p className="font-bold"> Virksomhet: </p>
        {isDropdownDisabled ? (
          <>
            <p className="w-full text-primary">{selectedBusinessAffiliation}</p>
            <p className="font-bold"> Ansattforhold: </p>
            <p className="w-full text-primary">{EmploymentType[selectedEmploymentType]}</p>

            <p className="font-bold"> Avdeling: </p>
            <p className="w-full text-primary">
              {selectedDepartment &&
                departments.find((item) => item.departmentId === selectedDepartment)?.name}
            </p>

            <p className="font-bold"> Seksjon: </p>
            <p className="w-full text-primary">
              {selectedSection &&
                sections?.find((item) => item.sectionId === selectedSection)?.name}
            </p>
            <p className="font-bold"> Fagområde: </p>
            <div className="w-full text-primary">
              {selectedSubjectFields.map((sf) => {
                const subj = subjectFields?.find((item) => item.subjectFieldId === sf);
                return subj ? (
                  <p className="w-full text-primary" key={subj.subjectFieldId}>
                    {subj.name}
                  </p>
                ) : null;
              })}
            </div>

            <p className="font-bold"> Roller: </p>
            <p className="w-full text-primary">
              {selectedRoles
                .map((r) => {
                  const roleToBeDisplayed = roles?.find((item) => item.roleId === r);
                  return roleToBeDisplayed ? roleToBeDisplayed.name : null;
                })
                .filter((r) => r !== null)
                .join(', ')}
            </p>

            <p className="font-bold"> Team: </p>
            <p className="w-full text-primary">
              {selectedTeams
                .map((t) => {
                  const teamToBeDisplayed = teams?.find((item) => item.teamId === t);
                  return teamToBeDisplayed ? teamToBeDisplayed.name : null;
                })
                .filter((t) => t !== null)
                .join(', ')}
            </p>
          </>
        ) : (
          <>
            <input
              type={'text'}
              value={selectedBusinessAffiliation}
              disabled={isDropdownDisabled}
              placeholder="Virksomhetstilhørighet"
              className={`w-[90%] md:w-[60%] rounded-full p-2 bg-primary-contrast text-left text-primary ${
                isDropdownDisabled
                  ? 'disabled: bg-disabled-blue border-0'
                  : 'border-1 border-primary-light'
              }`}
              onChange={(e) => setSelectedBusinessAffiliation(e.target.value)}
            />

            <p className="font-bold"> Ansattforhold: </p>
            <Dropdown
              className="w-[90%] md:w-[60%]"
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
              className="w-[90%] md:w-[60%]"
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
              className="w-[90%] md:w-[60%]"
              placeholder="Seksjon"
              options={(sections || []).map((s) => ({
                label: s.name,
                value: s.sectionId
              }))}
              onChange={setSelectedSection}
              value={selectedSection === -1 ? undefined : selectedSection}
              isDisabled={isDropdownDisabled}
            />

            <p className="font-bold"> Fagområde: </p>
            <DropdownMultiSelect
              className="w-[90%] md:w-[60%]"
              placeholder="Fagområde"
              options={(subjectFields || []).map((s) => ({
                label: s.name,
                value: s.subjectFieldId
              }))}
              onChange={setSelectedSubjectFields}
              value={selectedSubjectFields}
              isDisabled={isDropdownDisabled}
            />

            <p className="font-bold"> Rolle: </p>
            <DropdownMultiSelect
              className="w-[90%] md:w-[60%]"
              placeholder="Rolle"
              options={(roles || []).map((r) => ({
                label: r.name,
                value: r.roleId
              }))}
              onChange={setSelectedRoles}
              value={selectedRoles}
              isDisabled={isDropdownDisabled}
            />

            <p className="font-bold"> Team: </p>
            <DropdownMultiSelect
              className="w-[90%] md:w-[60%]"
              placeholder="Team"
              options={(teams || []).map((t) => ({
                label: t.name,
                value: t.teamId
              }))}
              onChange={setSelectedTeams}
              value={selectedTeams}
              isDisabled={isDropdownDisabled}
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-2 w-full justify-center pt-4">
        {errorAlertOpen && (
          <>
            <ErrorAlert message={errorAlertMessage} />
          </>
        )}
      </div>
      <div className="flex items-center gap-2 w-full justify-center pt-4">
        {isDropdownDisabled ? (
          <SubmitButton
            buttonText="Rediger"
            handleClick={() => setIsDropdownDisabled(false)}
            disabled={!isDropdownDisabled}
            disabledTitle={'Disabled'}
          />
        ) : (
          <>
            <SubmitButton
              buttonText="Avbryt"
              handleClick={handleCancelEdit}
              disabled={isDropdownDisabled}
              disabledTitle={'Disabled'}
            />
            <SubmitButton
              buttonText="Lagre"
              handleClick={userToBeUpdated}
              disabled={isDisabled}
              disabledTitle={'Fyll ut virksomhet, avdeling, seksjon og fagområde'}
            />
          </>
        )}
      </div>
    </PageLayout>
  );
}
