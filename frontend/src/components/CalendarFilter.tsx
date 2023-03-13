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

/**
 *
 * @returns component that is the page for first-time registering
 */
export default function FilterComponents() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const queryClient = useQueryClient();

  const { departments } = useGlobalContext();

  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [selectedSubjectFields, setSelectedSubjectFields] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [showSelectedSection, setShowSelectedSection] = useState(false);
  const [selectedSectionName, setSelectedSectionName] = useState('');

  const resetFilters = () => {
    setSelectedDepartment(-1);
    setSelectedSection(-1);
    setSelectedSubjectFields([]);
    setSelectedTeams([]);
    setSelectedRoles([]);
    setShowSelectedSection(false);
    setSelectedDate(null);
  };

  const handleDropdownSelect = (e: number, dropdownType: string) => {
    if (dropdownType === 'section') {
      setSelectedSection(e);
      setShowSelectedSection(true);
      const section = sections?.find((s) => s.sectionId === e);
      if (section) {
        setSelectedSectionName(section.name);
      }
    } else if (dropdownType === 'department') {
      setSelectedDepartment(e);
      setSelectedSection(-1);
      setSelectedSubjectFields([]);
      setSelectedTeams([]);
      setSelectedRoles([]);
      setShowSelectedSection(false);
    } else if (dropdownType === 'subjectFields') {
      setSelectedSubjectFields([e]);
      setShowSelectedSection(false);
    } else if (dropdownType === 'teams') {
      setSelectedTeams([e]);
      setShowSelectedSection(false);
    } else if (dropdownType === 'roles') {
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
    <>
      <div className="flex items-center justify-between px-4">
        <div className="flex space-x-10 ">
          <input
            type="date"
            onChange={(e: { target: { value: string | number | Date } }) =>
              handleDateChange(new Date(e.target.value))
            }
            className="modal-input border-1 rounded-[20px] border-primary text-center max-h-9 focus:outline-none pr-2"
          />

          <Dropdown
            placeholder="Avdeling"
            listOfOptions={departments.map((d) => ({ name: d.name, id: d.departmentId }))}
            handleChange={(e) => {
              setSelectedDepartment(e), handleDropdownSelect(e, 'department');
            }}
            value={selectedDepartment}
            className="!w-auto"
            isDisabled={false}
          />
          <Dropdown
            placeholder="Seksjon"
            listOfOptions={(sections || []).map((s) => ({ name: s.name, id: s.sectionId }))}
            handleChange={(e) => {
              setSelectedSection(e), handleDropdownSelect(e, 'section');
            }}
            value={selectedSection}
            className="!w-auto"
            isDisabled={false}
          />
          <DropdownMultiSelect
            placeholder="Fagområde"
            listOfOptions={(subjectFields || []).map((s) => ({
              name: s.name,
              id: s.subjectFieldId
            }))}
            handleChange={(e) => {
              setSelectedSubjectFields(e), handleDropdownSelect(e, 'subject-field');
            }}
            value={selectedSubjectFields}
            className="!w-auto"
            isExpands={false}
            isDisabled={false}
          />
          <DropdownMultiSelect
            placeholder="Team"
            listOfOptions={(teams || []).map((t) => ({ name: t.name, id: t.teamId }))}
            handleChange={(e) => {
              setSelectedTeams(e), handleDropdownSelect(e, 'team');
            }}
            value={selectedTeams}
            className="!w-auto"
            isExpands={false}
            isDisabled={false}
          />
          <DropdownMultiSelect
            placeholder="Rolle"
            listOfOptions={(roles || []).map((r) => ({ name: r.name, id: r.roleId }))}
            handleChange={(e) => {
              setSelectedRoles(e), handleDropdownSelect(e, 'role');
            }}
            value={selectedRoles}
            className="!w-auto"
            isExpands={false}
            isDisabled={false}
          />
          <button
            className=" border-1 rounded-[20px] border-primary text-center max-h-9 focus:outline-none px-2"
            onClick={resetFilters}
          >
            tøm filter
          </button>
        </div>
      </div>

      <div className="flex space-x-3 w-auto pb-3">
        {selectedDate && (
          <div className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2">
            <p className="my-1 space-x-2">{selectedDate.toDateString()}</p>
            <button
              className="text-white text-sm hover:underline focus:outline-none"
              onClick={() => setSelectedDate(null)}
            >
              X
            </button>
          </div>
        )}

        {selectedDepartment !== -1 && (
          <div className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2">
            <p className="my-1 ">
              {departments.find((d) => d.departmentId === selectedDepartment)?.name}
            </p>
            <button
              className="text-white text-sm hover:underline focus:outline-none"
              onClick={() => setSelectedDepartment(-1)}
            >
              X
            </button>
          </div>
        )}
        {showSelectedSection && (
          <div className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2">
            <p className="my-1">{selectedSectionName}</p>
            <button
              className="text-white text-sm hover:underline focus:outline-none"
              onClick={() => setShowSelectedSection(false)}
            >
              X
            </button>
          </div>
        )}

        {selectedSubjectFields.length > 0 && (
          <div className="flex flex-wrap">
            {selectedSubjectFields.map((sf) => (
              <div
                key={sf}
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1 space-x-2">
                  {subjectFields?.find((s) => s.subjectFieldId === sf)?.name}
                </p>
                <button
                  className="text-white text-sm hover:underline focus:outline-none"
                  onClick={() =>
                    setSelectedSubjectFields(selectedSubjectFields.filter((f) => f !== sf))
                  }
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedTeams.length > 0 && (
          <div className="flex flex-wrap">
            {selectedTeams.map((t) => (
              <div
                key={t}
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1 space-x-2">{teams?.find((tm) => tm.teamId === t)?.name}</p>
                <button
                  className="text-white text-sm hover:underline focus:outline-none"
                  onClick={() => setSelectedTeams(selectedTeams.filter((f) => f !== t))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedRoles.length > 0 && (
          <div className="flex flex-wrap">
            {selectedRoles.map((r) => (
              <div
                key={r}
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1 mr2 ">{roles?.find((rl) => rl.roleId === r)?.name}</p>
                <button
                  className="text-white hover:underline focus:outline-none"
                  onClick={() => setSelectedRoles(selectedRoles.filter((f) => f !== r))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
