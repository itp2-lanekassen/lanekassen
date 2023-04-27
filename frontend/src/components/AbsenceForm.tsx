import { Absence, User } from '@/types/types';
import { Button } from '@material-tailwind/react';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import {
  deleteAbsence,
  getDatePickerMaxForAbsence,
  getDatePickerMinForAbsence,
  getDisableDates,
  postAbsence,
  updateAbsence
} from '../API/AbsenceAPI';
import { useGlobalContext } from '../context/GlobalContext';
import { AbsenceRadioField } from './AbsenceRadioField';
import { CommentField } from './CommentField';

import { useUserContext } from '@/context/UserContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getAbsenceTypeById } from '../API/AbsenceTypeAPI';
import { DateField } from './DateField';
import { useModalContext } from '@/context/ModalContext';

type ModalProps = {
  startDate?: Date;
  user: User;
  type?: string;
  clickedAbsence?: Absence;
  onClose: () => void;
  handleClickOpen?: (event: MouseEvent) => void;
};

export type FormValues = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  comment?: string | undefined;
  absenceType: number;
};

// get all absence dates in arary
async function setDates(
  userId: number,
  setDisableDates: React.Dispatch<React.SetStateAction<Date[] | undefined>>
) {
  setDisableDates(await getDisableDates(userId));
}

//set max on datepicker state based on when the next absence starts
export async function setMax(
  userId: number,
  clickedAbsence: Absence | undefined,
  startDate: Date | undefined,
  setNextAbsenceStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
) {
  if (clickedAbsence) {
    setNextAbsenceStartDate(
      await getDatePickerMaxForAbsence(userId, new Date(clickedAbsence.endDate))
    );
  } else {
    if (startDate) {
      setNextAbsenceStartDate(await getDatePickerMaxForAbsence(userId, new Date(startDate)));
    }
  }
}

//set min on datepicker state based when the previous absence ends
export async function setMin(
  userId: number,
  clickedAbsence: Absence | undefined,
  startDate: Date | undefined,
  setPreviousAbsenceEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>
) {
  if (clickedAbsence) {
    setPreviousAbsenceEndDate(
      await getDatePickerMinForAbsence(userId, new Date(clickedAbsence.startDate))
    );
  } else {
    if (startDate) {
      setPreviousAbsenceEndDate(await getDatePickerMinForAbsence(userId, new Date(startDate)));
    }
  }
}

const AbsenceForm: React.FC<ModalProps> = ({
  user,
  onClose,
  startDate = undefined,
  type = 'add',
  clickedAbsence
}) => {
  const [disableDates, setDisableDates] = React.useState<Date[]>();
  const queryClient = useQueryClient();
  const { absenceTypes } = useGlobalContext();
  const { openConfirmationBox, openMessageBox } = useModalContext();
  const [nextAbsenceStartDate, setNextAbsenceStartDate] = React.useState<Date>();
  const [previousAbsenceEndDate, setPreviousAbsenceEndDate] = React.useState<Date>();

  const [isApproved, setIsApproved] = React.useState<boolean>(
    type === 'edit' && clickedAbsence ? clickedAbsence.isApproved : false
  );

  const [absenceId] = React.useState<number | undefined>(clickedAbsence?.absenceId);
  let buttonText = 'Legg til';
  if (type === 'edit') {
    buttonText = 'Lagre';
  }

  const currentUser = useUserContext();

  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: user.userId }]),
    onError: () => openMessageBox('Noe gikk galt. Prøv igjen senere.')
  });

  const { mutate: editAbsence } = useMutation({
    mutationFn: updateAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: user.userId }]),
    onError: () => openMessageBox('Noe gikk galt. Prøv igjen senere.')
  });

  const { mutate: deleteAbsenceMutation } = useMutation({
    mutationFn: deleteAbsence,
    onSuccess: () => {
      queryClient.invalidateQueries(['absences', { userId: user.userId }]), onClose();
    },
    onError: () => openMessageBox('Noe gikk galt. Prøv igjen senere.')
  });

  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate,
    endDate: undefined,
    comment: '',
    absenceType: absenceTypes[0].absenceTypeId
  });

  React.useEffect(() => {
    //When editing an absence, put all the current values in the fields of the AbsenceForm
    if (clickedAbsence) {
      setFormValues({
        startDate: new Date(clickedAbsence.startDate),
        endDate: new Date(clickedAbsence.endDate),
        comment: clickedAbsence.comment,
        absenceType: clickedAbsence.absenceTypeId
      });
      //set min and max for datepicker based on other absences
      setMax(currentUser.userId, clickedAbsence, formValues.startDate, setNextAbsenceStartDate);
      setMin(currentUser.userId, clickedAbsence, formValues.startDate, setPreviousAbsenceEndDate);
    }
  }, [clickedAbsence, startDate, user]);

  React.useEffect(() => {
    setDates(currentUser.userId, setDisableDates);
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  //update form values on date picker change
  const handleInputChange = (
    date: Date | null,
    event: React.SyntheticEvent | undefined,
    name: string
  ) => {
    setFormValues({
      ...formValues,
      [name]: date
    });
    if (name === 'startDate') {
      setFormValues({
        ...formValues,
        [name]: date,
        endDate: undefined // reset endDate if startDate changes
      });
      setMin(currentUser.userId, clickedAbsence, date, setPreviousAbsenceEndDate);
      setMax(currentUser.userId, clickedAbsence, date, setNextAbsenceStartDate);
    } else {
      setFormValues({
        ...formValues,
        [name]: date
      });
    }
  };

  //update form values on comment change
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleIsApprovedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsApproved(e.target.checked);
  };

  //update form values on radio change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      absenceType: Number(e.target.value)
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.startDate || !formValues.endDate) return;

    //add absence if type is 'add'
    if (type == 'add') {
      addAbsence({
        startDate: formValues.startDate.toISOString(),
        endDate: formValues.endDate.toISOString(),
        comment: formValues.comment,
        isApproved: currentUser.admin ? isApproved : false,
        absenceTypeId: formValues.absenceType,
        userId: user.userId
      });
    } else {
      //edit absence if type is 'edit'

      //Make comment undefined if it is an empty string
      let updatedComment;
      if (formValues.comment === '') {
        updatedComment = undefined;
      } else {
        updatedComment = formValues.comment;
      }

      const updatedAbsenceType = (await getAbsenceTypeById(formValues.absenceType)).data;

      //edit absence
      if (clickedAbsence) {
        await editAbsence({
          absenceId: clickedAbsence.absenceId,
          startDate: formValues.startDate.toISOString(),
          endDate: formValues.endDate.toISOString(),
          absenceTypeId: formValues.absenceType,
          type: updatedAbsenceType,
          userId: user.userId,
          user: user,
          isApproved: currentUser.admin ? isApproved : false,
          comment: updatedComment
        });
      }
    }

    onClose();
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
      <div className="modal-overlay pointer-events-none" onClick={onClose} />
      <div className="relative w-auto my-6 mx-auto max-w-3xl bg-primary-contrast px-10 pt-10 pb-5 rounded-[40px] border-primary border-2">
        <button
          type="button"
          className="modal-cancel-button absolute top-5 right-5 text-primary"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {user == currentUser ? (
          <h2 className="modal-title text-center ">
            {type == 'add' ? 'Legg til fravær' : 'Rediger fravær'}
          </h2>
        ) : (
          // If the user is not the current user, the modal is opened by an admin and should show the user's name
          <h2 className="modal-title text-center ">
            {type == 'add'
              ? 'Legg til fravær for ' + user.firstName
              : 'Rediger fravær for ' + user.firstName}
          </h2>
        )}
        <form className="modal-form" onSubmit={handleSubmit}>
          <DateField
            handleInputChange={handleInputChange}
            // min={previousAbsenceEndDate}
            // max={nextAbsenceStartDate}
            value={formValues.startDate}
            name="startDate"
            label="Fra"
            disableArray={disableDates}
            title=""
          ></DateField>
          <DateField
            handleInputChange={handleInputChange}
            min={formValues.startDate}
            max={nextAbsenceStartDate}
            value={formValues.endDate}
            name="endDate"
            label="Til"
            disabled={formValues.startDate === undefined ? true : false}
            title={'Fyll ut startdato først'}
          ></DateField>
          <AbsenceRadioField
            formValues={formValues}
            handleRadioChange={handleRadioChange}
          ></AbsenceRadioField>
          <CommentField
            formValues={formValues}
            handleInputChange={handleTextAreaChange}
          ></CommentField>
          {currentUser.admin && (
            <div className="flex items-center heading-xs space-x-5">
              <p onClick={() => setIsApproved(!isApproved)}>Godkjenn fravær</p>
              <input
                type="checkbox"
                id="isApproved"
                checked={isApproved}
                onChange={handleIsApprovedChange}
                className="space-x-5 h-5 w-5 accent-primary cursor-pointer"
              />
            </div>
          )}

          <div className="modal-buttons relative flex flex-row flex-parent items-center gap-8 justify-center pt-5">
            <Button
              type="submit"
              className="flex flex-child modal-submit-button button heading-xs px-4 py-2 rounded-full bg-primary text-primary-contrast hover:scale-110"
            >
              {buttonText}
            </Button>
            {absenceId && (
              <DeleteOutlineIcon
                onClick={() =>
                  openConfirmationBox(
                    () => deleteAbsenceMutation(absenceId),
                    'Er du sikker på at du vil slette fraværet?'
                  )
                }
                className="flex flex-child hover:text-primary-dark cursor-pointer text-primary scale-110 hover:scale-125"
                sx={{
                  color: '#410464',
                  height: '30px',
                  mr: '10px',
                  '&:hover': {
                    color: '#26023B',
                    scale: '1.1'
                  }
                }}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AbsenceForm;
