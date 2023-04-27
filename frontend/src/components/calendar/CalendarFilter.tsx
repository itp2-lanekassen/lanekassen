import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { UserFilter } from '@/types/types';
import Dropdown from '../Dropdown';
import { startTransition, useEffect, useState } from 'react';
import CustomMultiDropdown from './CustomMultiDropdown';
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import classNames from 'classnames';
import { Tune } from '@mui/icons-material';
import FilterDescription from './FilterDescription';

interface CalendarFilterItemProps {
  name?: string;
  className?: string;
  hideButton?: boolean;
  onClick?: () => void;
}

const CalendarFilterItem = ({
  name,
  onClick,
  className = '',
  hideButton = false
}: CalendarFilterItemProps) => {
  return (
    <div
      className={classNames(
        'rounded-full bg-primary-light text-white py-1 px-2 flex justify-center items-center gap-1 text-xs lg:text-sm',
        className
      )}
    >
      <p className="max-w-[160px] whitespace-nowrap overflow-hidden overflow-ellipsis">{name}</p>
      {!hideButton && (
        <button className="text-xs lg:text-sm hover:bg-primary rounded-full" onClick={onClick}>
          <CloseIcon fontSize="inherit" />
        </button>
      )}
    </div>
  );
};

export default function FilterComponents() {
  const { departments, sections, roles, subjectFields, teams } = useGlobalContext();
  const { dates, setDates, filter, setFilter } = useCalendarContext();

  const [open, setOpen] = useState(false);

  const [[localFrom, localTo], setLocalRange] = useState<[Date | null, Date | null]>([
    new Date(dates.from),
    new Date(dates.to)
  ]);

  useEffect(() => setLocalRange([new Date(dates.from), new Date(dates.to)]), [dates]);

  const handleDateChange = () => {
    if (!localFrom || !localTo) return setLocalRange([new Date(dates.from), new Date(dates.to)]);

    setDates({
      from: localFrom.toISOString(),
      to: localTo.toISOString()
    });
  };

  const handleChange = (key: keyof UserFilter, value?: number[]) => {
    if (key === 'departments') {
      return setFilter((oldFilter) => ({
        ...oldFilter,
        departments: value && value[0] !== -1 ? value : []
      }));
    }

    startTransition(() => {
      setFilter((oldFilter) => ({
        ...oldFilter,
        [key]: value
      }));
    });
  };

  return (
    <div className="grid gap-2 py-2 w-11/12 mx-auto">
      <FilterDescription className="mb-2" />
      <div className="flex gap-2 items-center">
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
            'z-40 lg:contents shadow-inner',
            'flex-col absolute gap-2 p-3',
            'left-0 right-0 bottom-0 top-[10%] bg-grey-lightest'
          )}
        >
          <div>
            <ReactDatepicker
              selectsRange
              startDate={localFrom}
              endDate={localTo}
              weekLabel="Uke"
              showWeekNumbers
              calendarStartDay={1}
              onChange={setLocalRange}
              onCalendarClose={handleDateChange}
              showYearDropdown
              dateFormat="P"
              className={classNames(
                'border-1 border-primary-light rounded-full text-primary-light',
                'py-1.5 px-3 focus:outline-primary-light flex w-full',
                'text-sm lg:text-base'
              )}
            />
          </div>

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
              'text-center px-2 h-9 whitespace-nowrap mt-auto lg:hidden',
              'text-primary-contrast bg-primary hover:bg-primary-contrast hover:text-primary'
            )}
            onClick={() => setOpen(false)}
          >
            Lukk
          </button>
          <button
            className={classNames(
              'border-1 rounded-full border-primary focus:outline-none',
              'text-center px-2 h-9 whitespace-nowrap',
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

      <div className="flex gap-2 self-end flex-wrap outline outline-1 outline-primary-light rounded-xl p-3 lg:p-0 relative w-full mx-auto lg:outline-0">
        <span className="absolute top-0 text-xs font-bold px-1 -translate-y-1/2 text-primary-light bg-grey-lightest lg:hidden">
          Filtrert på
        </span>

        <CalendarFilterItem
          className="lg:hidden"
          hideButton
          name={
            new Date(dates.from).toLocaleDateString(navigator.language, {
              day: 'numeric',
              month: 'numeric',
              year: '2-digit'
            }) +
            ' - ' +
            new Date(dates.from).toLocaleDateString(navigator.language, {
              day: 'numeric',
              month: 'numeric',
              year: '2-digit'
            })
          }
        />

        {filter.departments.length > 0 && (
          <CalendarFilterItem
            className="lg:hidden"
            name={departments.find((d) => d.departmentId === filter.departments[0])?.name}
            onClick={() => handleChange('departments', [-1])}
          />
        )}

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
    </div>
  );
}
