import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import ellipse from '../assets/Ellipse 1.png';
import { getAllRoles } from '../API/RoleAPI';
import { all } from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { getAllTeams } from '../API/TeamAPI';
import { getAllSubjectFields } from '../API/SubjectFieldAPI';
import { getAllDepartments } from '../API/DepartmentAPI';
import { getAllSections } from '../API/SectionAPI';
import { postUser } from '@/API/UserAPI';
import { NewUser } from '@/types/types';

/*
TODO: 
pass correct handleclick function to SubmitButton
pass correct data to listOfOptions (retrieve from database)
*/

/**
 *
 * @returns component that is the page for first-time registering
 */
/* export default function FirstTimeRegisterForm() {
  const [Roles, setAllRoles] = useState<string[]>([]);
  const [SubjectFields, setSubjectFields] = useState<string[]>([]);
  const [Teams, setTeams] = useState<string[]>([]);
  const [EmploymentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [Departments, setDepartments] = useState<string[]>([]);
  const [Sections, setSections] = useState<string[]>([]);

  const allRoles = async () => {
    const listOfRoles: string[] = [];
    const listOfFields: string[] = [];
    const listOfTeams: string[] = [];
    const listOfEmploymentTypes: string[] = ['Ansatt', 'Konsulent'];
    const listOfDepartments: string[] = [];
    const listOfSections: string[] = [];

    const roles = await getAllRoles();
    const teams = await getAllTeams();
    const section = await getAllSections();
    const department = await getAllDepartments();
    const subjectFields2 = await getAllSubjectFields();

    if (roles != null || roles != undefined) {
      roles.data.forEach((element) => {
        listOfRoles.push(element.name);
        listOfRoles.push(element.roleId);
      });
    }

    if (teams != null || teams != undefined) {
      teams.data.forEach((element) => {
        listOfTeams.push(element.name);
      });
    }
    if (section != null || section != undefined) {
      section.data.forEach((element) => {
        listOfSections.push(element.name);
      });
    }
    if (department != null || department != undefined) {
      department.data.forEach((element) => {
        listOfDepartments.push(element.name);
      });
    }

    if (subjectFields2 != null || subjectFields2 != undefined) {
      subjectFields2.data.forEach((element) => {
        listOfFields.push(element.name);
      });
    }

    setAllRoles(listOfRoles);
    setSubjectFields(listOfFields);
    setTeams(listOfTeams);
    setEmploymentTypes(listOfEmploymentTypes);
    setDepartments(listOfDepartments);
    setSections(listOfSections);
  };

  const handleClick = () => {
    let employ = 0; // Ansatt
    if (EmploymentTypes[0] == 'Konsulent') {
      employ = 1;
    }
    const newUser = {
      azureId: 'test-azure-id',
      firstName: 'test',
      lastName: 'test',
      email: 'test',
      admin: false,
      sectionId: 706969,
      department: Departments[0],
      section: Sections[0],
      subjectFields: SubjectFields,
      teams: Teams,
      roles: Roles,
      employmentType: employ
    };

    postUser(newUser as NewUser);
  };
  useEffect(() => {
    allRoles();
  }, []);

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
        <Dropdown placeholder="Avdeling" listOfOptions={Departments} />
        <Dropdown placeholder="Seksjon" listOfOptions={Sections} />
        <DropdownMultiSelect placeholder="Fagområde" listOfOptions={SubjectFields} />
        <DropdownMultiSelect placeholder="Team" listOfOptions={Teams} />
        <DropdownMultiSelect placeholder="Rolle" listOfOptions={Roles} />
        <Dropdown placeholder="Ansattforhold" listOfOptions={EmploymentTypes} />
        <SubmitButton buttonText="Registrer deg" handleClick={handleClick} />
      </div>
    </div>
  );
}
 */

export default function FirstTimeRegisterForm() {
  const [data, setData] = useState<{
    roles: { id: number; name: string }[];
    subjectFields: { id: number; name: string }[];
    teams: { id: number; name: string }[];
    departments: { id: number; name: string }[];
    sections: { id: number; name: string }[];
  }>({
    roles: [],
    subjectFields: [],
    teams: [],
    departments: [],
    sections: []
  });
  const [employmentType, setEmploymentType] = useState<string[]>(['Ansatt']);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(69);
  const [selectedSection, setSelectedSection] = useState<number>(69);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([456]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([123]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([321]);

  const fetchData = async () => {
    const roles = await getAllRoles();
    const teams = await getAllTeams();
    const section = await getAllSections();
    const department = await getAllDepartments();
    const subjectFields = await getAllSubjectFields();

    const newData = {
      roles: roles?.data?.map((r) => ({ id: r.roleId, name: r.name })) ?? [],
      subjectFields:
        subjectFields?.data?.map((s) => ({ id: s.subjectFieldId, name: s.name })) ?? [],
      teams: teams?.data?.map((t) => ({ id: t.teamId, name: t.name })) ?? [],
      departments: department?.data?.map((d) => ({ id: d.departmentId, name: d.name })) ?? [],
      sections: section?.data?.map((s) => ({ id: s.sectionId, name: s.name })) ?? []
    };
    setData(newData);
    console.log(newData);

    setEmploymentType(['Ansatt', 'Konsulent']);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    let employ = 0; // Ansatt
    if (employmentType[0] == 'Konsulent') {
      employ = 1;
    }
    const newUser = {
      azureId: 'test-azure-id',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.no',
      admin: false,
      sectionId: selectedSection,
      department: selectedDepartment,
      //section: selectedSection,
      subjectFields: selectedSubjectFields,
      teams: selectedTeams,
      roles: selectedRoles,
      employmentType: employ,
      absences: []
    };
    console.log(newUser);
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
          onChange={(e) => setSelectedDepartment(parseInt(e.target.value))}
          handleChange={(e) => setSelectedDepartment(e)}
        />
        <Dropdown
          placeholder="Seksjon"
          listOfOptions={data.sections.map((s) => ({ name: s.name, id: s.id }))}
          onChange={(e) => setSelectedSection(parseInt(e.target.value))}
          handleChange={(e) => setSelectedSection(e)}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          listOfOptions={data.subjectFields.map((s) => ({ name: s.name, id: s.id }))}
          onChange={(e) => setSelectedSubjectFields([parseInt(e.target.value)])}
          handleChange={(e) => setSelectedSubjectFields(e)}
        />
        <DropdownMultiSelect
          placeholder="Team"
          listOfOptions={data.teams.map((t) => ({ name: t.name, id: t.id }))}
          onChange={(e) => setSelectedTeams([parseInt(e.target.value)])}
          handleChange={(e) => setSelectedTeams(e)}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          listOfOptions={data.roles.map((r) => ({ name: r.name, id: r.id }))}
          onChange={(e) => setSelectedRoles([parseInt(e.target.value)])}
          handleChange={(e) => setSelectedRoles(e)}
        />
        {/*         <Dropdown
          placeholder="Ansattforhold"
          listOfOptions={employmentType.map((e) => ({ name: e, id: e }))}
          dropdownId={'ansattforhold'}
        /> */}
        <SubmitButton buttonText="Registrer deg" handleClick={handleClick} />
      </div>
    </div>
  );
}
