import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteAbsence } from '../API/AbsenceAPI';
import { Absence } from '../types/types';
import { darken } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
/**
 * Renders a component that shows a users absence instance
 */
export const AbsencePeriod = (props: { setAbsence: any; absence: Absence }) => {
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
  let absencePeriod = new Date(props.absence.startDate).toLocaleDateString();
  if (props.absence.startDate != props.absence.endDate) {
    absencePeriod = absencePeriod.concat(
      ' - ' + new Date(props.absence.endDate).toLocaleDateString()
    );
  }

  //Check if absence has a comment to display
  let notice;
  if (props.absence.comment && props.absence.comment.length > 0) {
    notice = (
      <p className="mx-[20px] pt-[10px] text-[18px]">
        Personlig notis <strong className="body-tight text-[12px]">{props.absence.comment}</strong>
      </p>
    );
  }
  const [hover, setHover] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteExistingAbsence } = useMutation({
    mutationFn: deleteAbsence,
    onSuccess: () => queryClient.invalidateQueries(['departments']),
    onError: () => alert('Fraværet kunne ikke slettes.')
  });
  return (
    <div className="w-[300px]  min-h-[fit-content] text-grey-lightest font-Rubik ">
      <div
        style={{
          borderRadius: expandStatus[1],
          backgroundColor: hover
            ? darken(props.absence.type.colorCode, 0.2)
            : props.absence.type.colorCode
        }}
        onClick={() => expandCollapse()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex flex-row justify-between leading-[30px] body-tight"
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
          Fraværstype <strong className="body-bold text-[12px]">{props.absence.type.name}</strong>
        </p>
        {notice}
        <div className="flex flex-row float-right">
          <EditOutlinedIcon
            onClick={() => {
              props.setAbsence(props.absence);
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
              const confirmDelete = confirm('Er du sikker på at du vil slette dette fraværet?');
              if (confirmDelete) {
                deleteExistingAbsence(props.absence.absenceId);
              }
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
