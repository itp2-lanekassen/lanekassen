import moment from 'moment';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { UserFilter } from '@/types/types';
import Dropdown from '../Dropdown';
import DropdownMultiSelect from '../DropdownMultiSelect';
import { useUserContext } from '@/context/UserContext';
import { useEffect } from 'react';
import { DateField } from '../DateField';
import { FormValues, setMax, setMin } from '../AbsenceForm';

export default function FilterComponents() {
  const { departments, sections, roles, subjectFields, teams } = useGlobalContext();
  const { fromDate, setFromDate, toDate, setToDate, filter, setFilter } = useCalendarContext();
  const currentUser = useUserContext();

  const handleChange = (key: keyof UserFilter, value: number[]) => {
    if (key === 'departments' && value.length) {
      return setFilter({
        departments: value,
        sections: [],
        subjectFields: [],
        roles: [],
        teams: []
      });
    }

    setFilter((oldFilter) => ({
      ...oldFilter,
      [key]: value
    }));
  };

  const handleDateChange = (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined,
    name: string
  ) => {
    if (date && name === 'fromDate') {
      setFromDate(moment(date).toISOString());
    } else if (date && name === 'toDate') {
      setToDate(moment(date).toISOString());
    }
  };

  const minFromDate = moment().subtract(30, 'days').toDate();

  return (
    <div className="grid grid-cols-calendar-filters gap-2 py-2">
      {/* TODO: only show weekdays in calendar */}
      <div className="col-start-1 flex flex-col w-10/12 justify-self-center">
        <label htmlFor="fromDate" className="body-bold text-sm text-primary">
          Fra:
        </label>
        <DateField
          handleInputChange={handleDateChange}
          min={minFromDate}
          value={fromDate ? new Date(fromDate) : undefined}
          name="fromDate"
          customClass="h-10"
        ></DateField>
      </div>

      <div className="col-start-1 row-start-2 w-10/12 justify-self-center">
        <label htmlFor="fromDate" className="body-bold text-sm text-primary">
          Til:
        </label>
        <DateField
          handleInputChange={handleDateChange}
          min={fromDate ? new Date(fromDate) : undefined}
          value={toDate ? new Date(toDate) : undefined}
          name="toDate"
          customClass="h-10"
        ></DateField>
      </div>

      <div className="flex items-end gap-4">
        <Dropdown
          placeholder="Avdeling"
          options={departments.map((d) => ({ label: d.name, value: d.departmentId }))}
          onChange={(val) => handleChange('departments', [val])}
          value={filter.departments[0]}
          isDisabled={false}
        />
        <DropdownMultiSelect
          placeholder="Seksjon"
          options={(sections || []).map((s) => ({ label: s.name, value: s.sectionId }))}
          onChange={(val) => handleChange('sections', val)}
          value={filter.sections}
        />
        <DropdownMultiSelect
          placeholder="Fagområde"
          options={(subjectFields || []).map((s) => ({
            label: s.name,
            value: s.subjectFieldId
          }))}
          onChange={(val) => handleChange('subjectFields', val)}
          value={filter.subjectFields}
        />
        <DropdownMultiSelect
          placeholder="Team"
          options={(teams || []).map((t) => ({ label: t.name, value: t.teamId }))}
          onChange={(val) => handleChange('teams', val)}
          value={filter.teams}
        />
        <DropdownMultiSelect
          placeholder="Rolle"
          options={(roles || []).map((r) => ({ label: r.name, value: r.roleId }))}
          onChange={(val) => handleChange('roles', val)}
          value={filter.roles}
        />
        <button
          className="border-1 rounded-full border-primary text-center focus:outline-none px-2 h-9 flex items-center text-primary-contrast bg-primary hover:bg-primary-contrast hover:text-primary"
          onClick={() => {
            setFilter({
              departments: [],
              sections: [],
              teams: [],
              roles: [],
              subjectFields: []
            });
          }}
        >
          Tøm filter
        </button>
      </div>

      <div className="flex gap-2 w-full">
        {filter.departments.length > 0 && filter.departments[0] !== -1 && (
          <div className="rounded-[20px] bg-primary text-primary-contrast px-2 flex justify-center items-center space-x-2">
            <p className="my-1 ">
              {departments.find((d) => d.departmentId === filter.departments[0])?.name}
            </p>
            <button
              className="text-primary-contrast text-sm hover:underline focus:outline-none"
              onClick={() => handleChange('departments', [])}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="flex flex-wrap space-x-2">
          {filter.sections.map((sectionId) => (
            <div
              key={sectionId}
              className="rounded-[20px] bg-primary text-primary-contrast px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1">{sections?.find((s) => s.sectionId === sectionId)?.name}</p>
              <button
                className="text-primary-contrast text-sm hover:underline focus:outline-none"
                onClick={() =>
                  handleChange(
                    'sections',
                    filter.sections.filter((s) => s !== sectionId)
                  )
                }
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap space-x-2">
          {filter.subjectFields.map((sf) => (
            <div
              key={sf}
              className="rounded-[20px] bg-primary text-primary-contrast px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1">{subjectFields?.find((s) => s.subjectFieldId === sf)?.name}</p>
              <button
                className="text-primary-contrast text-sm hover:underline focus:outline-none"
                onClick={() =>
                  handleChange(
                    'subjectFields',
                    filter.subjectFields.filter((f) => f !== sf)
                  )
                }
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap space-x-2">
          {filter.teams.map((t) => (
            <div
              key={t}
              className="rounded-[20px] bg-primary text-primary-contrast px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1">{teams?.find((tm) => tm.teamId === t)?.name}</p>
              <button
                className="text-primary-contrast text-sm hover:underline focus:outline-none"
                onClick={() =>
                  handleChange(
                    'teams',
                    filter.teams.filter((f) => f !== t)
                  )
                }
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap space-x-2">
          {filter.roles.map((r) => (
            <div
              key={r}
              className="rounded-[20px] bg-primary text-primary-contrast px-2 flex justify-center items-center space-x-2"
            >
              <p className="my-1 mr2 ">{roles?.find((rl) => rl.roleId === r)?.name}</p>
              <button
                className="text-primary-contrast hover:underline focus:outline-none"
                onClick={() =>
                  handleChange(
                    'roles',
                    filter.roles.filter((f) => f !== r)
                  )
                }
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
