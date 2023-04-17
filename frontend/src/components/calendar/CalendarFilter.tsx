import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { UserFilter } from '@/types/types';
import Dropdown from '../Dropdown';
import { startTransition, useState, useEffect } from 'react';
import CustomMultiDropdown from './CustomMultiDropdown';
import { DateField } from '../DateField';
import classNames from 'classnames';
import DropdownMultiSelect from '../DropdownMultiSelect';

import { SingleCalendarCellDisplay } from '../SingleCalendarCellDisplay';
import { useUserContext } from '@/context/UserContext';

interface CalendarFilterItemProps {
  name?: string;
  onClick: () => void;
}

const CalendarFilterItem = ({ name, onClick }: CalendarFilterItemProps) => {
  return (
    <div className="rounded-full bg-primary-light text-white py-1 px-2 flex justify-center items-center gap-1">
      <p className="max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis">{name}</p>
      <button className="text-sm hover:bg-primary rounded-full" onClick={onClick}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default function FilterComponents() {
  const { departments, sections, roles, subjectFields, teams } = useGlobalContext();
  const { dates, setDates, filter, setFilter } = useCalendarContext();
  const { absenceTypes } = useGlobalContext();
  const [showDescription, setShowDescription] = useState(false);
  const handleChange = (key: keyof UserFilter, value?: number[]) => {
    if (key === 'departments') {
      return setFilter({
        departments: value && value[0] !== -1 ? value : [],
        sections: [],
        subjectFields: [],
        roles: [],
        teams: []
      });
    }

    startTransition(() => {
      setFilter((oldFilter) => ({
        ...oldFilter,
        [key]: value
      }));
    });
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
          handleInputChange={(date) =>
            setDates((d) => ({ ...d, from: moment(date).toISOString() }))
          }
          min={minFromDate}
          value={new Date(dates.from)}
          name="fromDate"
          customClass="h-10"
        />
      </div>

      <div className="col-start-1 flex flex-col row-start-2 w-10/12 justify-self-center">
        <label htmlFor="toDate" className="body-bold text-sm">
          Til:
        </label>
        <DateField
          handleInputChange={(date) => setDates((d) => ({ ...d, to: moment(date).toISOString() }))}
          value={new Date(dates.to)}
          name="toDate"
          customClass="h-10"
        />
      </div>

      <div className="flex gap-2 self-end">
        <Dropdown
          placeholder="Avdeling"
          options={[
            { label: 'Alle avdelinger', value: -1 },
            ...departments.map((d) => ({ label: d.name, value: d.departmentId }))
          ]}
          onChange={(val) => handleChange('departments', val ? [val] : undefined)}
          value={filter.departments[0]}
          isDisabled={false}
        />

        <CustomMultiDropdown
          placeholder="Seksjon"
          options={sections.map((s) => ({ label: s.name, value: s.sectionId }))}
          onChange={(val) => handleChange('sections', val)}
          value={filter.sections}
        />
        <CustomMultiDropdown
          placeholder="Fagområde"
          options={subjectFields.map((s) => ({
            label: s.name,
            value: s.subjectFieldId
          }))}
          onChange={(val) => handleChange('subjectFields', val)}
          value={filter.subjectFields}
        />
        <CustomMultiDropdown
          placeholder="Team"
          options={teams.map((t) => ({ label: t.name, value: t.teamId }))}
          onChange={(val) => handleChange('teams', val)}
          value={filter.teams}
        />
        <CustomMultiDropdown
          placeholder="Rolle"
          options={roles.map((r) => ({ label: r.name, value: r.roleId }))}
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
        <div className="flex gap-2 self-end flex-wrap">
          {filter.sections.map((sectionId) => (
            <CalendarFilterItem
              key={sectionId}
              name={sections.find((s) => s.sectionId === sectionId)?.name}
              onClick={() =>
                handleChange(
                  'sections',
                  filter.sections.filter((s) => s !== sectionId)
                )
              }
            />
          ))}

          {filter.subjectFields.map((sf) => (
            <CalendarFilterItem
              key={sf}
              name={subjectFields.find((s) => s.subjectFieldId === sf)?.name}
              onClick={() =>
                handleChange(
                  'subjectFields',
                  filter.subjectFields.filter((f) => f !== sf)
                )
              }
            />
          ))}

          {filter.teams.map((t) => (
            <CalendarFilterItem
              key={t}
              name={teams.find((tm) => tm.teamId === t)?.name}
              onClick={() =>
                handleChange(
                  'teams',
                  filter.teams.filter((f) => f !== t)
                )
              }
            />
          ))}

          {filter.roles.map((r) => (
            <CalendarFilterItem
              key={r}
              name={roles.find((rl) => rl.roleId === r)?.name}
              onClick={() =>
                handleChange(
                  'roles',
                  filter.roles.filter((f) => f !== r)
                )
              }
            />
          ))}
        </div>
        <div className="flex ml-auto">
          <button
            className="border-1 rounded-full border-primary text-center focus:outline-none px-4 h-11 mt-4 flex items-center text-primary-contrast bg-primary hover:bg-white hover:text-primary"
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
          >
            ?
          </button>
          {showDescription && (
            <div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary z-50 px-4 py-2 rounded-lg text-primary-contrast"
              onMouseEnter={() => setShowDescription(true)}
              onMouseLeave={() => setShowDescription(false)}
            >
              <h2 className="text-xl mb-6 text-primary-contrast">Forklaring av farger og koder</h2>
              <div className="flex flex-col">
                {absenceTypes.map((type) => (
                  <div
                    key={type.absenceTypeId}
                    className="w-100 inline-flex justify-start items-center md:heading-2xs text-xs"
                  >
                    <div className="mb-2">
                      <SingleCalendarCellDisplay code={type.code} colorCode={type.colorCode} />
                    </div>
                    <span className="overflow-hidden text-ellipsis text-primary-contrast whitespace-nowrap">
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
    </div>
  );
}
