import { Absence, User } from '@/types/types';
import { Button } from '@material-tailwind/react';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import * as React from 'react';
import {
  deleteAbsence,
  getDatePickerMaxForAbsence,
  getDatePickerMinForAbsence,
  postAbsence,
  updateAbsence
} from '../API/AbsenceAPI';
import { useGlobalContext } from '../context/GlobalContext';
import { AbsenceRadioField } from './AbsenceRadioField';
import { CommentField } from './CommentField';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getAbsenceTypeById } from '../API/AbsenceTypeAPI';
import { DateField } from './DateField';
import { useUserContext } from '@/context/UserContext';

type ModalProps = {
  startDate?: Date;
  user: User;
  type?: string;
  clickedAbsence?: Absence;
  onClose: () => void;
};

export type FormValues = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  comment: string | undefined;
  absenceType: number;
};

//set max on datepicker state based on when the next absence starts
async function setMax(
  currentUser: any,
  clickedAbsence: Absence | undefined,
  startDate: Date | undefined,
  setNextAbsenceStartDate: any
) {
  if (clickedAbsence) {
    setNextAbsenceStartDate(
      await getDatePickerMaxForAbsence(currentUser.userId, new Date(clickedAbsence.endDate))
    );
  } else {
    if (startDate) {
      setNextAbsenceStartDate(
        await getDatePickerMaxForAbsence(currentUser.userId, new Date(startDate))
      );
    }
  }
}

//set min on datepicker state based when the previous absence ends
async function setMin(
  currentUser: any,
  clickedAbsence: Absence | undefined,
  startDate: Date | undefined,
  setPreviousAbsenceEndDate: any
) {
  if (clickedAbsence) {
    setPreviousAbsenceEndDate(
      await getDatePickerMinForAbsence(currentUser.userId, new Date(clickedAbsence.startDate))
    );
  } else {
    if (startDate) {
      setPreviousAbsenceEndDate(
        await getDatePickerMinForAbsence(currentUser.userId, new Date(startDate))
      );
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
  const queryClient = useQueryClient();
  const { absenceTypes } = useGlobalContext();
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
    onError: () => alert('Kunne ikke legge til fravær')
  });

  const { mutate: editAbsence } = useMutation({
    mutationFn: updateAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: user.userId }]),
    onError: () => alert('Kunne ikke endre fravær')
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
        startDate: new Date(moment(clickedAbsence.startDate).format('YYYY-MM-DD')),
        endDate: new Date(moment(clickedAbsence.endDate).format('YYYY-MM-DD')),
        comment: clickedAbsence.comment,
        absenceType: clickedAbsence.absenceTypeId
      });
    }
    //set min and max for datepicker based on other absences
    setMax(user, clickedAbsence, startDate, setNextAbsenceStartDate);
    setMin(user, clickedAbsence, startDate, setPreviousAbsenceEndDate);
  }, []);

  React.useEffect(() => {
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
    event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement, Event> | undefined,
    name: string
  ) => {
    setFormValues({
      ...formValues,
      [name]: date
    });
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
    //add absence if type is 'add'
    if (type == 'add') {
      addAbsence({
        startDate: moment(formValues.startDate).toISOString(true).split('+')[0] + 'Z',
        endDate: moment(formValues.endDate).toISOString(true).split('+')[0] + 'Z',
        comment: formValues.comment,
        isApproved,
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
          startDate: moment(formValues.startDate).toISOString(true).split('+')[0] + 'Z',
          endDate: moment(formValues.endDate).toISOString(true).split('+')[0] + 'Z',
          absenceTypeId: formValues.absenceType,
          type: updatedAbsenceType,
          userId: user.userId,
          user: user,
          isApproved,
          comment: updatedComment
        });
      }
    }

    onClose();
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
      <div className="modal-overlay pointer-events-none" onClick={onClose} />
      <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white px-10 pt-10 pb-5 rounded-[40px] ">
        <h2 className="modal-title text-center ">
          {' '}
          {user.firstName} {user.lastName}{' '}
        </h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <DateField
            handleInputChange={handleInputChange}
            min={previousAbsenceEndDate}
            max={formValues.endDate || nextAbsenceStartDate}
            value={formValues.startDate}
            name="startDate"
            label="Fra"
          ></DateField>
          <DateField
            handleInputChange={handleInputChange}
            min={formValues.startDate}
            max={nextAbsenceStartDate}
            value={formValues.endDate}
            name="endDate"
            label="Til"
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
              <p>Godkjenn fravær</p>
              <input
                type="checkbox"
                id="isApproved"
                checked={isApproved}
                onChange={handleIsApprovedChange}
                // eslint-disable-next-line react/no-unknown-property
                className="space-x-5 h-5 w-5 accent-primary "
              />
            </div>
          )}

          <div className="modal-buttons relative flex flex-row flex-parent items-center gap-8 justify-center pt-5">
            <Button
              type="submit"
              className="flex flex-child modal-submit-button button heading-xs px-4 py-2 rounded-full bg-primary text-white hover:scale-110"
            >
              {buttonText}
            </Button>
            {absenceId && (
              <DeleteOutlineIcon
                onClick={() => {
                  const confirmDelete = confirm('Er du sikker på at du vil slette dette fraværet?');
                  if (confirmDelete) {
                    deleteAbsence(absenceId);
                  }
                }}
                className="flex flex-child hover:text-primary-dark cursor-pointer text-primary scale-110 hover:scale-125"
              ></DeleteOutlineIcon>
            )}
          </div>
        </form>
        <button
          type="button"
          className="modal-cancel-button absolute top-5 right-5 text-primary"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default AbsenceForm;
