import { deleteAbsence } from '@/API/AbsenceAPI';
import { Absence } from '@/types/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { darken } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import ConfirmationBox from './ConfirmationBox';
import { useUserContext } from '@/context/UserContext';
import classNames from 'classnames';
/**
 * Renders a component that shows a users absence instance
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

  const { mutate: deleteExistingAbsence } = useMutation({
    mutationFn: deleteAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => alert('Fraværet kunne ikke slettes.')
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteClick = (result: boolean) => {
    if (result && props.absence) {
      deleteExistingAbsence(props.absence.absenceId);
    }
    setOpenDialog(false);
  };

  return (
    <div
      className={classNames(
        'md:w-[300px] w-full px-[50px] md:px-0 md:mx-6',
        'text-grey-lightest font-Rubik rounded-2xl overflow-hidden',
        'outline-primary outline-2',
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
        className="flex flex-row justify-between leading-[30px] w-full body-tight"
      >
        <p className="ml-[20px]">{absencePeriod}</p>
        <ExpandMoreIcon
          sx={{
            color: 'primary-contrast',
            height: '30px',
            mr: '10px',
            transform: arrowRotation
          }}
        />
      </button>
      <section
        style={{ display: expandStatus[0] }}
        className="flex flex-col text-primary subheading-small py-[10px] bg-primary-lighter overflow-hidden"
      >
        <p className="mx-[20px] text-[18px]">
          Fraværstype <strong className="body-bold text-[12px]">{props.absence.type.name}</strong>
        </p>
        {props.absence.isApproved ? (
          <p className="mx-[20px] text-[18px]">
            <strong className="body-bold text-[12px]">Godkjent fravær</strong>
          </p>
        ) : (
          <p className="mx-[20px] text-[18px]">
            <strong className="body-bold text-[12px]">Ikke godkjent</strong>
          </p>
        )}
        {notice}
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
          <button onClick={() => setOpenDialog(true)} className="mr-[10px]">
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
            {openDialog && (
              <div className="flex justify-between items-center">
                <ConfirmationBox
                  confirmationText="Er du sikker på at du vil slette fraværet?"
                  isOpen={openDialog}
                  onConfirm={handleDeleteClick}
                />
              </div>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
