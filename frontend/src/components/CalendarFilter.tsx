import Dropdown from './Dropdown';
import DropdownMultiSelect from './DropdownMultiSelect';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { EmploymentType } from '../types/types';
import { useGlobalContext } from '@/context/GlobalContext';
import { useUserContext } from '@/context/UserContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { func } from 'prop-types';

/**
 *
 * @returns component that is the page for first-time registering
 */
export default function FilterComponents() {
  const queryClient = useQueryClient();

  const { azureUser } = useUserContext();
  const { departments } = useGlobalContext();

  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [showSelectedSection, setShowSelectedSection] = useState(false);
  const [selectedSectionName, setSelectedSectionName] = useState("");

  const handleDropdownSelect = (e: number, dropdownType: string) => {
    if (dropdownType === "section") {
      setSelectedSection(e);
      setShowSelectedSection(true);
      const section = sections?.find((s) => s.sectionId === e);
      if (section) {
        setSelectedSectionName(section.name);
      }
    } else if (dropdownType === "department") {
      setSelectedDepartment(e);
      setSelectedSection(-1);
      setSelectedSubjectFields([]);
      setSelectedTeams([]);
      setSelectedRoles([]);
      setShowSelectedSection(false);
    } else if (dropdownType === "subjectFields") {
      setSelectedSubjectFields([e]);
      setShowSelectedSection(false);
    } else if (dropdownType === "teams") {
      setSelectedTeams([e]);
      setShowSelectedSection(false);
    } else if (dropdownType === "roles") {
      setSelectedRoles([e]);
      setShowSelectedSection(false);
    }
  };

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
    <div className="flex items-center justify-between px-4">
      <div className="flex space-x-10 ">
        <Dropdown
          placeholder="Avdeling"
          listOfOptions={departments.map((d) => ({ name: d.name, id: d.departmentId }))}
          handleChange={(e) => { setSelectedDepartment(e), handleDropdownSelect(e, 'department') }}
          value={selectedDepartment}
          className="!w-40"

        />
        <Dropdown
          placeholder="Seksjon"
          listOfOptions={(sections || []).map((s) => ({ name: s.name, id: s.sectionId }))}
          handleChange={(e) => { setSelectedSection(e), handleDropdownSelect(e, 'section') }}
          value={selectedSection}
          className="!w-40"

        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          listOfOptions={(subjectFields || []).map((s) => ({ name: s.name, id: s.subjectFieldId }))}
          handleChange={(e) => { setSelectedSubjectFields(e), handleDropdownSelect(e, 'subject-field') }}
          value={selectedSubjectFields}
          className="!w-40"

        />
        <DropdownMultiSelect
          placeholder="Team"
          listOfOptions={(teams || []).map((t) => ({ name: t.name, id: t.teamId }))}
          handleChange={(e) => { setSelectedTeams(e), handleDropdownSelect(e, 'team') }}
          value={selectedTeams}
          className="!w-40"

        />
        <DropdownMultiSelect
          placeholder="Rolle"
          listOfOptions={(roles || []).map((r) => ({ name: r.name, id: r.roleId }))}
          handleChange={(e) => { setSelectedRoles(e), handleDropdownSelect(e, 'role') }}
          value={selectedRoles}
          className="!w-40"
        />
      </div>
      <div>
      <div>
  {selectedDepartment !== -1 && (
    <div>
      <p>{departments.find((d) => d.departmentId === selectedDepartment)?.name}</p>
    </div>
  )}
  {selectedSection !== -1 && (
    <div>
      <p>{sections?.find((s) => s.sectionId === selectedSection)?.name}</p>
    </div>
  )}
  {selectedSubjectFields.length > 0 && (
    <div>
      {selectedSubjectFields.map((sf) => (
        <p key={sf}>{subjectFields?.find((s) => s.subjectFieldId === sf)?.name}</p>
      ))}
    </div>
  )}
  {selectedTeams.length > 0 && (
    <div>
      {selectedTeams.map((t) => (
        <p key={t}>{teams?.find((tm) => tm.teamId === t)?.name}</p>
      ))}
    </div>
  )}
  {selectedRoles.length > 0 && (
    <div>
      {selectedRoles.map((r) => (
        <p key={r}>{roles?.find((rl) => rl.roleId === r)?.name}</p>
      ))}
    </div>
  )}
</div>
      </div>
    </div>

  );
}