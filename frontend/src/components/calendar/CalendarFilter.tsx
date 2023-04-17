import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { UserFilter } from '@/types/types';
import Dropdown from '../Dropdown';
import { startTransition, useState } from 'react';
import CustomMultiDropdown from './CustomMultiDropdown';
import { DateField } from '../DateField';
import classNames from 'classnames';

import { SingleCalendarCellDisplay } from '../SingleCalendarCellDisplay';
import { Tune } from '@mui/icons-material';

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

  const [open, setOpen] = useState(false);

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

      <div
        className={classNames(
          'hidden lg:flex flex-col justify-self-center',
          'col-start-1 row-start-2 w-10/12 '
        )}
      >
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
        <button
          className={classNames(
            'text-primary-contrast bg-primary-light hover:text-primary-light hover:bg-primary-contrast',
            'outline outline-1 outline-primary-light',
            'rounded-full text-center align-middle py-1 px-2',
            'flex items-center mx-auto lg:hidden'
          )}
          onClick={() => setOpen(!open)}
        >
          <Tune fontSize="inherit" />
          &nbsp;Filtrer
        </button>
        <div
          className={classNames(
            open ? 'flex' : 'hidden',
            'h-5/6 z-40 lg:contents',
            'flex-col absolute gap-2 p-3',
            'left-0 right-0 bottom-0 bg-grey-lightest z-50'
          )}
        >
          <button className="text-primary-light mb-2 lg:hidden" onClick={() => setOpen(false)}>
            Lukk
          </button>
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
            className={classNames(
              'border-1 rounded-full border-primary focus:outline-none',
              'text-center px-2 h-9 whitespace-nowrap mt-auto',
              'text-primary-contrast bg-primary hover:bg-primary-contrast hover:text-primary'
            )}
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
      </div>

      <div className="flex gap-2 self-end flex-wrap outline outline-1 outline-primary-light rounded-xl p-3 relative">
        <span className="absolute top-0 text-xs font-bold px-1 -translate-y-1/2 text-primary-light bg-grey-lightest">
          Filtrert på
        </span>
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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card-one z-50 px-4 py-2 rounded-lg text-primary border-primary border-2"
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
          >
            <h2 className="text-xl mb-6 text-primary">Forklaring av farger og koder</h2>
            <div className="flex flex-col">
              {absenceTypes.map((type) => (
                <div
                  key={type.absenceTypeId}
                  className="w-100 inline-flex justify-start items-center md:heading-2xs text-xs"
                >
                  <div className="mb-2 pr-2">
                    <SingleCalendarCellDisplay code={type.code} colorCode={type.colorCode} />
                  </div>
                  <span className="overflow-hidden text-ellipsis text-primary whitespace-nowrap pb-1">
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
