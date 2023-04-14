import moment from 'moment';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { UserFilter, AbsenceType } from '@/types/types';
import Dropdown from '../Dropdown';
import DropdownMultiSelect from '../DropdownMultiSelect';
import { useState } from 'react';
import { SingleCalendarCellDisplay } from '../SingleCalendarCellDisplay';

export default function FilterComponents() {
  const { departments, sections, roles, subjectFields, teams } = useGlobalContext();
  const { fromDate, setFromDate, toDate, setToDate, filter, setFilter } = useCalendarContext();
  const [showDescription, setShowDescription] = useState(false);
  const { absenceTypes } = useGlobalContext();

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

  return (
    <div className="grid grid-cols-calendar-filters gap-2 py-2">
      {/* TODO: only show weekdays in calendar */}
      <div className="col-start-1 flex flex-col w-10/12 justify-self-center">
        <label htmlFor="fromDate" className="body-bold text-sm">
          Fra:
        </label>
        <input
          id="fromDate"
          type="date"
          value={moment(fromDate).format('yyyy-MM-DD')}
          onChange={(e) => setFromDate(moment(e.target.value).toISOString())}
          className={classNames(
            'px-2 py-1 rounded-full text-center',
            'border-1 border-primary focus:outline-none'
          )}
        />
      </div>

      <div className="col-start-1 row-start-2 w-10/12 justify-self-center">
        <label htmlFor="toDate" className="body-bold text-sm">
          Til:
        </label>
        <input
          id="toDate"
          type="date"
          value={moment(toDate).format('yyyy-MM-DD')}
          onChange={(e) => setToDate(moment(e.target.value).toISOString())}
          className={classNames(
            'px-2 py-1 rounded-full text-center',
            'border-1 border-primary focus:outline-none'
          )}
        />
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
          className="border-1 rounded-full border-primary text-center focus:outline-none px-2 h-9 flex items-center text-white bg-primary hover:bg-white hover:text-primary"
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
        <div className="flex gap-2 w-full">
          {filter.departments.length > 0 && filter.departments[0] !== -1 && (
            <div className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2">
              <p className="my-1 ">
                {departments.find((d) => d.departmentId === filter.departments[0])?.name}
              </p>
              <button
                className="text-white text-sm hover:underline focus:outline-none"
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
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1">{sections?.find((s) => s.sectionId === sectionId)?.name}</p>
                <button
                  className="text-white text-sm hover:underline focus:outline-none"
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
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1">{subjectFields?.find((s) => s.subjectFieldId === sf)?.name}</p>
                <button
                  className="text-white text-sm hover:underline focus:outline-none"
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
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1">{teams?.find((tm) => tm.teamId === t)?.name}</p>
                <button
                  className="text-white text-sm hover:underline focus:outline-none"
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
                className="rounded-[20px] bg-primary text-white px-2 flex justify-center items-center space-x-2"
              >
                <p className="my-1 mr2 ">{roles?.find((rl) => rl.roleId === r)?.name}</p>
                <button
                  className="text-white hover:underline focus:outline-none"
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
        <button
          className="border-1 rounded-full border-primary text-center focus:outline-none px-4 h-10 flex items-center text-white bg-primary hover:bg-white hover:text-primary"
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        >
          ?
        </button>
        {showDescription && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary z-50 px-4 py-2 rounded-lg text-white"
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
          >
            <h2 className="text-xl mb-6 text-white">Forklaring av farger og koder</h2>
            <div className="flex flex-col">
              {absenceTypes.map((type) => (
                <div
                  key={type.absenceTypeId}
                  className="w-100 inline-flex justify-start items-center md:heading-2xs text-xs"
                >
                  <div className="mb-2">
                    <SingleCalendarCellDisplay code={type.code} colorCode={type.colorCode} />
                  </div>
                  <span className="overflow-hidden text-ellipsis text-white whitespace-nowrap">
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
            <p>Skravert rute betyr at fraværet ikke er godkjent enda</p>
          </div>
        )}
      </div>
    </div>
  );
}
