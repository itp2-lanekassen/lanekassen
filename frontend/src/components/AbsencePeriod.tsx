import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteAbsence } from '../API/AbsenceAPI';
/**
 * Renders a component that shows a users absence instance
 */
export const AbsencePeriod = (props: {
  setVisibility: any;
  setAbsence: any;
  dateStart: string;
  dateEnd: string;
  absenceType: string;
  personalNote: string | undefined;
  id: number;
}) => {
  const [expandStatus, setExpandStatus] = useState<string[]>(['none', '20px']);
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');
  const [visibleNote, setVisibleNote] = useState('none');

  //Expand/collapse component to show more/less information on click
  const expandCollapse = () => {
    if (expandStatus[0] == 'none') {
      setExpandStatus(['block', '20px 20px 0px 0px']);
      setArrowRotation('rotate(180deg)');
      if (props.personalNote && props.personalNote.length > 0) {
        setVisibleNote('block');
      }
    } else {
      setExpandStatus(['none', '20px']);
      setArrowRotation('rotate(0deg)');
    }
  };

  //Check if absence period lasts for more that one day
  let absencePeriod = new Date(props.dateStart).toLocaleDateString();
  if (props.dateStart != props.dateEnd) {
    absencePeriod = absencePeriod.concat(' - ' + new Date(props.dateEnd).toLocaleDateString());
  }

  //get user with azure id
  //let absences = await getUser();

  return (
    <div className="w-[300px]  min-h-[fit-content] text-grey-lightest font-Rubik ">
      <div
        style={{ borderRadius: expandStatus[1] }}
        onClick={() => expandCollapse()}
        className="flex flex-row justify-between bg-primary hover:bg-primary-dark leading-[30px] body-tight"
      >
        <p className="ml-[20px]">{absencePeriod}</p>
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
          Fraværstype <strong className="body-bold text-[12px]">{props.absenceType}</strong>
        </p>
        <p style={{ display: visibleNote }} className="mx-[20px] pt-[10px] text-[18px]">
          Personlig notis <strong className="body-tight text-[12px]">{props.personalNote}</strong>
        </p>
        <div className="flex flex-row float-right">
          <EditOutlinedIcon
            onClick={() => {
              props.setAbsence(props.id);
              console.log('wiwo');
              props.setVisibility(['none', 'block', 'none']);
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
          <DeleteOutlineIcon
            onClick={() => {
              deleteAbsence(props.id);
            }}
            sx={{
              color: '#410464',
              height: '30px',
              mr: '10px',
              '&:hover': {
                color: '#26023B'
              }
            }}
          ></DeleteOutlineIcon>
        </div>
      </section>
    </div>
  );
};
