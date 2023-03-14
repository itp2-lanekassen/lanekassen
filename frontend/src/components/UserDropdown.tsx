import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Department, Role, Section, SubjectField, Team } from '@/types/types';

// hent seksjon, department osv
// bruk get-funksjoner kanskje?
// paste inn seksjon, department osv
// skjul editknappen hos andre brukere hvis ikke admin
// style bra
// add funksjonalitet til egen editknapp

export default function UserDropdown(props: {
  departmentId: number;
  section: Section | undefined;
  name: string;
  subjectField: SubjectField[];
  team: Team[];
  role: Role[];
  employmentType: number;
  isCurrentUser: boolean;
}) {
  const [expandStatus, setExpandStatus] = useState<string[]>(['none', '20px']);
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');

  const [selectedDepartment, setSelectedDepartment] = useState<number>(props.departmentId);

  //Expand/collapse component to show more/less information on click
  const expandCollapse = () => {
    if (expandStatus[0] == 'none') {
      setExpandStatus(['block', '20px 20px 0px 0px']);
      setArrowRotation('rotate(180deg)');
    } else {
      setExpandStatus(['none', '20px']);
      setArrowRotation('rotate(0deg)');
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
        <p className="ml-[20px]">{props.name}</p>
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
        <p className="mx-[px] text-[18px]">
          Ansatt <strong className="body-bold text-[12px]">{props.employmentType}</strong>
        </p>
        <p>
          Seksjon <strong className="body-bold text-[12px]">{props.section?.name}</strong>
        </p>
        <p>
          Avdeling <strong className="body-bold text-[12px]">{selectedDepartment}</strong>
        </p>
        <div className={`${props.isCurrentUser ? 'block' : 'hidden'} flex flex-row float-right`}>
          <EditOutlinedIcon
            onClick={() => {
              console.log('wiwo');
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
