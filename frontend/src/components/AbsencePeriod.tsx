import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

/**
 * Renders a component that shows a users absence instance
 */
export const AbsencePeriod = (props: {
  dateStart: string;
  dateEnd: string;
  absenceType: string;
  personalNote: string;
}) => {
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

  //Check if absence period lasts for more that one day
  let absencePeriod = props.dateStart;
  if (props.dateStart != props.dateEnd) {
    absencePeriod = absencePeriod.concat(' - ' + props.dateEnd);
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
        className="flex flex-col text-primary subheading-small py-[10px] bg-primary-lighter rounded-b-[20px]"
      >
        <p className="mx-[20px] text-[18px]">
          Fraværstype <strong className="body-bold text-[12px]">{props.absenceType}</strong>
        </p>
        <p className="mx-[20px] pt-[10px] text-[18px]">
          Personlig notis <strong className="body-tight text-[12px]">{props.personalNote}</strong>
        </p>
      </section>
    </div>
  );
};
