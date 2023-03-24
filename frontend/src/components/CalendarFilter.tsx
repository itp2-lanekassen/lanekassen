import Dropdown from './Dropdown';
import DropdownMultiSelect from './DropdownMultiSelect';
import CloseIcon from '@mui/icons-material/Close';

import { useGlobalContext } from '../context/GlobalContext';
import { useFilterContext } from '../context/FilterContext';
import moment from 'moment';

export default function FilterComponents() {
  const { departments, sections, roles, subjectFields, teams } = useGlobalContext();
  const {
    fromDate,
    setFromDate,
    departments: selectedDepartments,
    setDepartments,
    sections: selectedSections,
    setSections,
    teams: selectedTeams,
    setTeams,
    roles: selectedRoles,
    setRoles,
    subjectFields: selectedSubjectFields,
    setSubjectFields
  } = useFilterContext();

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="flex space-x-10 ">
          <input
            type="date"
            value={moment(fromDate).format('yyyy-MM-DD')}
            onChange={(e) => setFromDate(moment(e.target.value).startOf('isoWeek').toISOString())}
            className="modal-input border-1 rounded-[20px] border-primary text-center max-h-9 focus:outline-none pr-2"
          />

          <Dropdown
            placeholder="Avdeling"
            options={departments.map((d) => ({ label: d.name, value: d.departmentId }))}
            onChange={(e) => {
              setDepartments([e]);
              if (e !== -1) {
                setSections([]);
                setSubjectFields([]);
                setTeams([]);
                setRoles([]);
              }
            }}
            value={selectedDepartments[0]}
            isDisabled={false}
          />
          <DropdownMultiSelect
            placeholder="Seksjon"
            options={(sections || []).map((s) => ({ label: s.name, value: s.sectionId }))}
            onChange={setSections}
            value={selectedSections}
          />
          <DropdownMultiSelect
            placeholder="Fagområde"
            options={(subjectFields || []).map((s) => ({
              label: s.name,
              value: s.subjectFieldId
            }))}
            onChange={setSubjectFields}
            value={selectedSubjectFields}
          />
          <DropdownMultiSelect
            placeholder="Team"
            options={(teams || []).map((t) => ({ label: t.name, value: t.teamId }))}
            onChange={setTeams}
            value={selectedTeams}
          />
          <DropdownMultiSelect
            placeholder="Rolle"
            options={(roles || []).map((r) => ({ label: r.name, value: r.roleId }))}
            onChange={setRoles}
            value={selectedRoles}
          />
          <button
            className="border-1 rounded-[20px] border-primary text-center w-fit focus:outline-none px-2 text-white bg-primary hover:bg-white hover:text-primary"
            onClick={() => {
              setDepartments([]);
              setSections([]);
              setSubjectFields([]);
              setTeams([]);
              setRoles([]);
            }}
          >
            Tøm filter
          </button>
        </div>
      </div>

      <div className="flex space-x-3 w-auto pb-3 pt-2">
        {selectedDepartments.length > 0 && selectedDepartments[0] !== -1 && (
          <div className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2">
            <p className="my-1 ">
              {departments.find((d) => d.departmentId === selectedDepartments[0])?.name}
            </p>
            <button
              className="text-white text-sm hover:underline focus:outline-none"
              onClick={() => setDepartments([])}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="flex flex-wrap space-x-2">
          {selectedSections.map((sectionId) => (
            <div
              key={sectionId}
              className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1">{sections?.find((s) => s.sectionId === sectionId)?.name}</p>
              <button
                className="text-white text-sm hover:underline focus:outline-none"
                onClick={() => setSections(selectedSections.filter((s) => s !== sectionId))}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap space-x-2">
          {selectedSubjectFields.map((sf) => (
            <div
              key={sf}
              className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1">{subjectFields?.find((s) => s.subjectFieldId === sf)?.name}</p>
              <button
                className="text-white text-sm hover:underline focus:outline-none"
                onClick={() => setSubjectFields(selectedSubjectFields.filter((f) => f !== sf))}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap space-x-2">
          {selectedTeams.map((t) => (
            <div
              key={t}
              className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1">{teams?.find((tm) => tm.teamId === t)?.name}</p>
              <button
                className="text-white text-sm hover:underline focus:outline-none"
                onClick={() => setTeams(selectedTeams.filter((f) => f !== t))}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap space-x-2">
          {selectedRoles.map((r) => (
            <div
              key={r}
              className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1 mr2 ">{roles?.find((rl) => rl.roleId === r)?.name}</p>
              <button
                className="text-white hover:underline focus:outline-none"
                onClick={() => setRoles(selectedRoles.filter((f) => f !== r))}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
