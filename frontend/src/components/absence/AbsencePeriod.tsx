import { deleteAbsence } from '@/api/absence';
import { Absence } from '@/types/interfaces';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { darken } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import classNames from 'classnames';
import { useModalContext } from '@/context/ModalContext';
import { format } from 'date-fns';

/**
 * Renders a absence period in AbsenceView
 */
export const AbsencePeriod = (props: {
  isSelected?: boolean;
  setAbsence: Dispatch<SetStateAction<Absence | undefined>>;
  absence: Absence;
}) => {
  const [expandStatus, setExpandStatus] = useState<string[]>(['none', '20px']);
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');
  const [hover, setHover] = useState(false);
  const queryClient = useQueryClient();
  const currentUser = useUserContext();
  const { openConfirmationBox, openMessageBox } = useModalContext();

  const expandCollapse = () => {
    if (expandStatus[0] == 'none') {
      setExpandStatus(['block', '20px 20px 0px 0px']);
      setArrowRotation('rotate(180deg)');
    } else {
      setExpandStatus(['none', '20px']);
      setArrowRotation('rotate(0deg)');
    }
  };

  // Check if absence period lasts for more than one day
  let absencePeriod = format(new Date(props.absence.startDate), 'P');
  if (props.absence.startDate != props.absence.endDate) {
    absencePeriod = absencePeriod.concat(' - ' + format(new Date(props.absence.endDate), 'P'));
  }

  // Display that absence comment is longer than what is shown
  const shortenComment = (comment: string) => {
    if (comment.length > 20 && !comment.includes(' ')) {
      const shorterComment = comment.slice(0, 35) + '...';
      return shorterComment;
    }
    return comment;
  };

  // Check if absence has a comment to display
  let notice;
  if (props.absence.comment && props.absence.comment.length > 0) {
    notice = (
      <p className="mx-[20px] pt-[10px] text-sm">
        <strong className="body-bold"> Personlig notis: </strong>
        {shortenComment(props.absence.comment)}
      </p>
    );
  }

  const { mutate: deleteExistingAbsence } = useMutation({
    mutationFn: deleteAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => openMessageBox('Fraværet kunne ikke slettes.')
  });

  return (
    <div
      className={classNames(
        'md:w-[300px] w-full px-[50px] md:px-0 md:mx-6 rounded-2xl bg-primary-lighter',
        'text-grey-lightest font-Rubik overflow-hidden',
        'outline-primary outline-2 mb-2',
        props.isSelected && 'outline'
      )}
    >
      <button
        style={{
          backgroundColor: hover
            ? darken(props.absence.type.colorCode, 0.2)
            : props.absence.type.colorCode
        }}
        onClick={() => expandCollapse()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex flex-row justify-between rounded-2xl leading-[30px] w-full body-tight min-h-[fit-content]"
      >
        <span className="ml-[20px]">{absencePeriod}</span>
        <ExpandMoreIcon
          sx={{
            color: '#FAFAFA',
            height: '30px',
            mr: '10px',
            transform: arrowRotation
          }}
        />
      </button>
      <div
        style={{ display: expandStatus[0] }}
        className="flex flex-col text-primary subheading-small py-[10px] overflow-hidden"
      >
        <p className="mx-[20px] pt-[10px] text-sm">
          <strong className="body-bold"> Fraværstype: </strong>
          {props.absence.type.name}
        </p>
        {notice}
        <p className="mx-[20px] pt-[10px] text-sm">
          <strong className="body-bold"> Status: </strong>
          {props.absence.isApproved ? 'Godkjent' : 'Ikke godkjent'}
        </p>
        <div className="flex flex-row float-right">
          <button
            className="mr-[10px]"
            onClick={() => {
              props.setAbsence(props.absence);
              window.scrollTo(9999, 9999);
            }}
          >
            <EditOutlinedIcon
              sx={{
                color: '#410464',
                height: '30px',
                width: '30px',
                '&:hover': {
                  color: '#26023B'
                }
              }}
            />
          </button>
          <button
            onClick={() =>
              openConfirmationBox(
                () => deleteExistingAbsence(props.absence.absenceId),
                'Er du sikker på at du vil slette fraværet?'
              )
            }
            className="mr-[10px]"
          >
            <DeleteOutlineIcon
              sx={{
                color: '#410464',
                height: '30px',
                width: '30px',
                '&:hover': {
                  color: '#26023B',
                  scale: '1.1'
                }
              }}
            ></DeleteOutlineIcon>
          </button>
        </div>
      </div>
    </div>
  );
};
