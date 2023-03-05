import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import ellipse from '../assets/Ellipse 1.png';
import { useEffect, useState } from 'react';
import {
  getAllDepartments,
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { postUser } from '../API/UserAPI';
import { NewUser } from '../types/types';

/**
 *
 * @returns component that is the page for first-time registering
 */
export default function FirstTimeRegisterForm() {
  const [data, setData] = useState<{
    roles: { id: number; name: string }[];
    subjectFields: { id: number; name: string }[];
    teams: { id: number; name: string }[];
    sections: { id: number; name: string }[];
  }>({
    roles: [],
    subjectFields: [],
    teams: [],
    sections: []
  });
  const [department, setDepartment] = useState<{ id: number; name: string }[]>([]);
  const [employmentType, setEmploymentType] = useState<{ id: number; name: string }[]>([]);

  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<number>(-1);

  const [isReset, setIsReset] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const fetchData = async () => {
    try {
      const [roles, teams, sections, subjectFields] = await Promise.all([
        getRolesByDepartmentId(selectedDepartment),
        getTeamsByDepartmentId(selectedDepartment),
        getSectionsByDepartmentId(selectedDepartment),
        getSubjectFieldsByDepartmentId(selectedDepartment)
      ]);

      const newData = {
        roles: roles?.data?.map((r) => ({ id: r.roleId, name: r.name })) ?? [],
        subjectFields:
          subjectFields?.data?.map((s) => ({ id: s.subjectFieldId, name: s.name })) ?? [],
        teams: teams?.data?.map((t) => ({ id: t.teamId, name: t.name })) ?? [],
        sections: sections?.data?.map((s) => ({ id: s.sectionId, name: s.name })) ?? []
      };
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const mapEmploymentType = () => {
    const employmentTypes = ['Ansatt', 'Konsulent'];
    const mappedEmploymentType = employmentTypes.map((e, i) => ({ id: i, name: e }));
    setEmploymentType(mappedEmploymentType);
  };

  const fetchDepartments = async () => {
    try {
      const fetchedDepartments = await getAllDepartments();
      const mappedDepartments = fetchedDepartments?.data?.map((d) => ({
        id: d.departmentId,
        name: d.name
      }));
      setDepartment(mappedDepartments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setIsReset(true);
    resetStatesOnDepartmentChange();
    setIsReset(false);
  };
  function resetStatesOnDepartmentChange() {
    if (selectedDepartment !== -1) {
      setSelectedSection(-1);
      setSelectedSubjectFields([]);
      setSelectedTeams([]);
      setSelectedRoles([]);
      setData({
        roles: [],
        subjectFields: [],
        teams: [],
        sections: []
      });
    }
  }

  useEffect(() => {
    mapEmploymentType();
    fetchDepartments();
  }, []);

  useEffect(() => {
    handleReset();
    if (selectedDepartment !== -1) fetchData();
  }, [selectedDepartment]);

  useEffect(() => {
    setIsDisabled(
      selectedDepartment === -1 ||
        selectedSection === -1 ||
        selectedSubjectFields.length === 0 ||
        selectedEmploymentType === -1
    );
  }, [selectedDepartment, selectedSection, selectedSubjectFields, selectedEmploymentType]);

  const handleClick = () => {
    const newUser = {
      // TODO: remove hardcoded values and get from azure
      azureId: 'test-azure-id',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.no',
      admin: false,
      sectionId: selectedSection,
      department: selectedDepartment,
      subjectFields: selectedSubjectFields,
      teams: selectedTeams,
      roles: selectedRoles,
      employmentType: selectedEmploymentType,
      absences: []
    };
    postUser(newUser as NewUser);
  };

  return (
    <div className="max-w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="sm:w-[70vw] mobile:w-[90vw] sm:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Første registrering</h1>
      </div>
      <div className="flex flex-1 flex-col items-center tablet:mt-20 mobile:mt-40">
        <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={employmentType.map((e) => ({ name: e.name, id: e.id }))}
          handleChange={(e) => setSelectedEmploymentType(e)}
          value={selectedEmploymentType}
        />
        <Dropdown
          placeholder="Avdeling"
          listOfOptions={department.map((d) => ({ name: d.name, id: d.id }))}
          handleChange={(e) => setSelectedDepartment(e)}
          value={selectedDepartment}
        />
        <Dropdown
          placeholder="Seksjon"
          listOfOptions={data.sections.map((s) => ({ name: s.name, id: s.id }))}
          handleChange={(e) => setSelectedSection(e)}
          value={isReset ? -1 : selectedSection}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          listOfOptions={data.subjectFields.map((s) => ({ name: s.name, id: s.id }))}
          handleChange={(e) => setSelectedSubjectFields(e)}
          value={isReset ? [] : selectedSubjectFields}
        />
        <DropdownMultiSelect
          placeholder="Team"
          listOfOptions={data.teams.map((t) => ({ name: t.name, id: t.id }))}
          handleChange={(e) => setSelectedTeams(e)}
          value={isReset ? [] : selectedTeams}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          listOfOptions={data.roles.map((r) => ({ name: r.name, id: r.id }))}
          handleChange={(e) => setSelectedRoles(e)}
          value={isReset ? [] : selectedRoles}
        />

        <SubmitButton
          buttonText="Registrer deg"
          handleClick={handleClick}
          disabled={isDisabled}
          disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
        />
      </div>
    </div>
  );
}
