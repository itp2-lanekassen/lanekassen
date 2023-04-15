import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Department, EmploymentType, Section, User } from '@/types/types';
import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { useUserContext } from '@/context/UserContext';

export default function UserDropdown(props: { user: User; isCurrentUser: boolean }) {
  const currentUser = useUserContext();

  const [isSet, setIsSet] = useState<boolean>(false);

  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [teams, setTeams] = useState<string[]>();
  const [subjectFields, setSubjectFields] = useState<string[]>();
  const [employmentType, setEmploymentType] = useState<string>('');
  const [businessAffiliation, setBusinessAffiliation] = useState<string>('');
  const [roles, setRoles] = useState<string[]>();

  const formatName = (name: string) => {
    return name
      .split(' ')
      .map((n, i, arr) => {
        // if first or last name, return whole name
        if (i === 0 || i === arr.length - 1) return n;

        // return first character in uppercase with . after
        return n[0].toUpperCase() + '.';
      })
      .join(' ');
  };

  // Expand/collapse component to show more/less information on click
  // Add data to fields in dropdown if clicked for the first time
  const expandCollapse = async () => {
    if (isSet) return setIsSet(false);

    const listTeam: string[] = [];
    const listSubjectField: string[] = [];
    const listRole: string[] = [];

    setDepartment((await getDepartmentById(props.user.departmentId)).data);
    setSection((await getSectionById(props.user.sectionId)).data);
    setBusinessAffiliation(props.user.businessAffiliation);

    props.user.teams?.forEach((team) => listTeam.push(team.name));
    setTeams(listTeam);
    console.log(props.user);

    props.user.subjectFields?.forEach((subjectField) => listSubjectField.push(subjectField.name));
    setSubjectFields(listSubjectField);

    props.user.roles?.forEach((role) => listRole.push(role.name));
    setRoles(listRole);

    setEmploymentType(EmploymentType[props.user.employmentType]);

    setIsSet(true);
  };

  return (
    <div className="col-start-1 w-full font-header rounded-xl overflow-hidden">
      <div
        className={`${
          props.isCurrentUser ? 'bg-secondary-light' : 'bg-primary-light'
        } flex justify-between items-center text-grey-lightest px-2 cursor-pointer`}
        onClick={() => expandCollapse()}
      >
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {formatName(`${props.user.firstName} ${props.user.lastName}`)}
        </span>
        <ExpandMoreIcon className={isSet ? 'rotate-180' : 'rotate-0'} />
      </div>

      <div
        className={`${props.isCurrentUser ? 'bg-card-two-light' : 'bg-primary-lighter'} ${
          isSet ? 'flex' : 'hidden'
        } text-primary subheading-small p-2 flex flex-col gap-1`}
      >
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Virksomhet:</strong>
          {businessAffiliation}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Ansattforhold:</strong>
          {employmentType}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Avdeling:</strong>
          {department?.name}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Seksjon:</strong>
          {section?.name}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Fagområde:</strong>
          {subjectFields?.join(', ')}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Team:</strong>
          {teams?.join(', ')}
        </p>
        <p className="text-sm flex flex-col">
          <strong className="body-bold text-xs">Rolle:</strong>
          {roles?.join(', ')}
        </p>
        <div className={`${props.isCurrentUser || currentUser.admin ? 'flex' : 'hidden'}`}>
          <EditOutlinedIcon
            className="ml-auto cursor-pointer hover:text-secondary-light"
            onClick={() => console.log('Implement edit user here')}
          />
        </div>
      </div>
    </div>
  );
}
