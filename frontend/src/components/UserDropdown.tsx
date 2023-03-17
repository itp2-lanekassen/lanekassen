import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Department, Section, User } from '@/types/types';
import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';

export default function UserDropdown(props: {
  user: User;
  isCurrentUser: boolean;
  isAdmin: boolean;
}) {
  const [expandStatus, setExpandStatus] = useState<string[]>(['none', '20px']);
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');
  const [isSet, setIsSet] = useState<boolean>(false);
  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [teams, setTeams] = useState<string[]>();
  const [subjectFields, setSubjectFields] = useState<string[]>();
  const [employmentType, setEmploymentType] = useState<string>('');
  const [roles, setRoles] = useState<string[]>();

  // Expand/collapse component to show more/less information on click
  // Add data to fields in dropdown if clicked for the first time
  const expandCollapse = async () => {
    if (expandStatus[0] == 'none') {
      setExpandStatus(['block', '20px 20px 0px 0px']);
      setArrowRotation('rotate(180deg)');
    } else {
      setExpandStatus(['none', '20px']);
      setArrowRotation('rotate(0deg)');
    }

    if (!isSet) {
      const listTeam: string[] = [];
      const listSubjectField: string[] = [];
      const listRole: string[] = [];

      setDepartment((await getDepartmentById(props.user.departmentId)).data);
      setSection((await getSectionById(props.user.sectionId)).data);

      props.user.teams?.forEach((team) => listTeam.push(team.name));
      setTeams(listTeam);

      props.user.subjectFields?.forEach((subjectField) => listSubjectField.push(subjectField.name));
      setSubjectFields(listSubjectField);

      props.user.roles?.forEach((role) => listRole.push(role.name));
      setRoles(listRole);

      if (props.user.employmentType == 1) {
        setEmploymentType('Konsulent');
      } else if (props.user.employmentType == 0) {
        setEmploymentType('Ansatt');
      } else {
        setEmploymentType('Noe gikk galt');
      }

      setIsSet(true);
    }
  };

  return (
    <div className="w-[180px]  min-h-[fit-content] text-grey-lightest font-Rubik ">
      <div
        style={{ borderRadius: expandStatus[1] }}
        onClick={() => expandCollapse()}
        className={`${
          props.isCurrentUser ? 'bg-secondary-light' : 'bg-primary-light'
        } flex flex-row justify-between leading-[30px] body-tight`}
      >
        <p className="ml-[20px]">{props.user.firstName + ' ' + props.user.lastName}</p>
        <ExpandMoreIcon
          sx={{
            color: 'white',
            height: '30px',
            mr: '10px',
            transform: arrowRotation
          }}
        ></ExpandMoreIcon>
      </div>
      <section
        style={{ display: expandStatus[0] }}
        className={`${
          props.isCurrentUser ? 'bg-card-two-light' : 'bg-primary-lighter'
        } text-primary subheading-small py-[10px] rounded-b-[20px] overflow-hidden`}
      >
        <p>
          Ansattforhold <strong className="body-bold text-[12px]">{employmentType}</strong>
        </p>
        <p>
          Avdeling <strong className="body-bold text-[12px]">{department?.name}</strong>
        </p>
        <p>
          Seksjon <strong className="body-bold text-[12px]">{section?.name}</strong>
        </p>
        <p>
          Fagområde <strong className="body-bold text-[12px]">{subjectFields?.join(', ')}</strong>
        </p>
        <p>
          Team <strong className="body-bold text-[12px]">{teams?.join(', ')}</strong>
        </p>
        <p>
          Rolle <strong className="body-bold text-[12px]">{roles?.join(', ')}</strong>
        </p>
        <div
          className={`${
            props.isCurrentUser || props.isAdmin ? 'block' : 'hidden'
          } flex flex-row float-right`}
        >
          <EditOutlinedIcon
            onClick={() => {
              console.log('Implement edit user here');
            }}
            sx={{
              color: '#410464',
              height: '30px',
              mr: '10px',
              '&:hover': {
                color: '#26023B'
              }
            }}
          ></EditOutlinedIcon>
        </div>
      </section>
    </div>
  );
}
