import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EmploymentType, User } from '@/types/interfaces';
import useViewport from '@/context/calendarContextHelpers/useViewport';

export default function UserDropdown(props: { user: User; isCurrentUser: boolean }) {
  const [open, setOpen] = useState(false);

  const { width } = useViewport();

  const formatName = (name: string) => {
    return name
      .split(' ')
      .map((n, i, arr) => {
        // if last name, return whole name
        if (i === arr.length - 1) return n;
        // if first name, return whole name if screen is bigger than 425px
        if (i === 0 && width > 425) return n;

        // return first character in uppercase with . after
        return n[0].toUpperCase() + '.';
      })
      .join(' ');
  };

  return (
    <div className="col-start-1 w-full font-header rounded-xl overflow-hidden text-sm lg:text-base">
      <button
        className={`${
          props.isCurrentUser ? 'bg-secondary-light' : 'bg-primary-light'
        } flex justify-between items-center text-grey-lightest px-2 cursor-pointer w-full`}
        onClick={() => setOpen(!open)}
      >
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {formatName(`${props.user.firstName} ${props.user.lastName}`)}
        </span>
        <ExpandMoreIcon fontSize="inherit" className={open ? 'rotate-180' : 'rotate-0'} />
      </button>

      <div
        className={`${props.isCurrentUser ? 'bg-card-two-light' : 'bg-primary-lighter'} ${
          open ? 'flex' : 'hidden'
        } text-primary subheading-small p-2 flex flex-col gap-1`}
      >
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Virksomhet:</strong>
          {props.user.businessAffiliation}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Ansattforhold:</strong>
          {EmploymentType[props.user.employmentType]}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Avdeling:</strong>
          {props.user.department?.name}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Seksjon:</strong>
          {props.user.section?.name}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Fagområde:</strong>
          {props.user.subjectFields?.map((subjectField) => subjectField.name)}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Team:</strong>
          {props.user.teams?.map((team) => team.name).join(', ')}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Rolle:</strong>
          {props.user.roles?.map((role) => role.name)}
        </p>
      </div>
    </div>
  );
}
