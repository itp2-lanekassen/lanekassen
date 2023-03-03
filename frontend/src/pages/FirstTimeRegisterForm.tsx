import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import ellipse from '../assets/Ellipse 1.png';
import { getAllRoles } from '../API/RoleAPI';
import { useEffect, useState } from 'react';
import { getAllTeams } from '../API/TeamAPI';
import { getAllSubjectFields } from '../API/SubjectFieldAPI';
import { getAllDepartments } from '../API/DepartmentAPI';
import { getAllSections } from '../API/SectionAPI';
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
    departments: { id: number; name: string }[];
    sections: { id: number; name: string }[];
    employmentType: { id: number; name: string }[];
  }>({
    roles: [],
    subjectFields: [],
    teams: [],
    departments: [],
    sections: [],
    employmentType: []
  });

  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedEmploymentType, setEmploymentType] = useState<number>(-1);

  const fetchData = async () => {
    try {
      const [roles, teams, sections, departments, subjectFields] = await Promise.all([
        getAllRoles(),
        getAllTeams(),
        getAllSections(),
        getAllDepartments(),
        getAllSubjectFields()
      ]);
      const employmentType = ['Ansatt', 'Konsulent'];

      const newData = {
        roles: roles?.data?.map((r) => ({ id: r.roleId, name: r.name })) ?? [],
        subjectFields:
          subjectFields?.data?.map((s) => ({ id: s.subjectFieldId, name: s.name })) ?? [],
        teams: teams?.data?.map((t) => ({ id: t.teamId, name: t.name })) ?? [],
        departments: departments?.data?.map((d) => ({ id: d.departmentId, name: d.name })) ?? [],
        sections: sections?.data?.map((s) => ({ id: s.sectionId, name: s.name })) ?? [],
        employmentType: employmentType.map((e, i) => ({ id: i, name: e }))
      };
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    // validate that department, section, subjectFields and employmentype are not empty
    if (selectedDepartment === -1) {
      alert('Avdeling må velges');
      return;
    }
    if (selectedSection === -1) {
      alert('Seksjon må velges');
      return;
    }
    if (selectedSubjectFields.length === 0) {
      alert('Fagområde må velges');
      return;
    }
    if (selectedEmploymentType === -1) {
      alert('Ansettelsesform må velges');
      return;
    }

    const newUser = {
      // TODO: remove hardcoded values
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
          placeholder="Avdeling"
          listOfOptions={data.departments.map((d) => ({ name: d.name, id: d.id }))}
          handleChange={(e) => setSelectedDepartment(e)}
        />
        <Dropdown
          placeholder="Seksjon"
          listOfOptions={data.sections.map((s) => ({ name: s.name, id: s.id }))}
          handleChange={(e) => setSelectedSection(e)}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          listOfOptions={data.subjectFields.map((s) => ({ name: s.name, id: s.id }))}
          handleChange={(e) => setSelectedSubjectFields(e)}
        />
        <DropdownMultiSelect
          placeholder="Team"
          listOfOptions={data.teams.map((t) => ({ name: t.name, id: t.id }))}
          handleChange={(e) => setSelectedTeams(e)}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          listOfOptions={data.roles.map((r) => ({ name: r.name, id: r.id }))}
          handleChange={(e) => setSelectedRoles(e)}
        />
        <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={data.employmentType.map((e) => ({ name: e.name, id: e.id }))}
          handleChange={(e) => setEmploymentType(e)}
        />
        <SubmitButton buttonText="Registrer deg" handleClick={handleClick} />
      </div>
    </div>
  );
}
