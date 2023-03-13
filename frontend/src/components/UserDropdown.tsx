import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function UserDropdown(props: {
  department: string;
  section: string;
  name: string;
  subjectField: string;
  team: string;
  role: string;
  employmentType: number;
  isCurrentUser: boolean;
}) {
  const [expandStatus, setExpandStatus] = useState<string[]>(['none', '20px']);
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');

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
    <div className="w-[300px]  min-h-[fit-content] text-grey-lightest font-Rubik ">
      <div
        style={{ borderRadius: expandStatus[1] }}
        onClick={() => expandCollapse()}
        className="flex flex-row justify-between bg-primary hover:bg-primary-dark leading-[30px] body-tight"
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
        className="flex flex-col text-primary subheading-small py-[10px] bg-primary-lighter rounded-b-[20px] overflow-hidden"
      >
        <p className="mx-[20px] text-[18px]">
          <strong className="body-bold text-[12px]">{props.employmentType}</strong>
        </p>
        <div className="flex flex-row float-right">
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
