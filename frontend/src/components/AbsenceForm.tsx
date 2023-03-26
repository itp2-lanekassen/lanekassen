import { Button } from '@material-tailwind/react';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import {
  getDatePickerMaxForAbsence,
  getDatePickerMinForAbsence,
  postAbsence,
  updateAbsence
} from '../API/AbsenceAPI';
import * as React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { AbsenceRadioField } from './AbsenceRadioField';
import { CommentField } from './CommentField';
import { Absence } from '../types/types';
import { getAbsenceTypeById } from '../API/AbsenceTypeAPI';
import { DateField } from './DateField';

type ModalProps = {
  startDate?: Date;
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
  onClose,
  startDate = undefined,
  type = 'add',
  clickedAbsence
}) => {
  const queryClient = useQueryClient();
  const currentUser = useUserContext();
  const { absenceTypes } = useGlobalContext();
  const [nextAbsenceStartDate, setNextAbsenceStartDate] = React.useState<Date>();
  const [previousAbsenceEndDate, setPreviousAbsenceEndDate] = React.useState<Date>();

  let buttonText = 'Legg til';
  if (type === 'edit') {
    buttonText = 'Rediger';
  }

  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }])
  });

  //initialize mutaions for editing absence
  const { mutate: editAbsence } = useMutation({
    mutationFn: (absence: Absence) => updateAbsence(absence),
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }])
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
    setMax(currentUser, clickedAbsence, startDate, setNextAbsenceStartDate);
    setMin(currentUser, clickedAbsence, startDate, setPreviousAbsenceEndDate);
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
        isApproved: false,
        absenceTypeId: formValues.absenceType,
        userId: currentUser.userId
      });
      alert('Fraværet ble lagt til!');
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
        editAbsence({
          absenceId: clickedAbsence.absenceId,
          startDate: moment(formValues.startDate).toISOString(true).split('+')[0] + 'Z',
          endDate: moment(formValues.endDate).toISOString(true).split('+')[0] + 'Z',
          absenceTypeId: formValues.absenceType,
          type: updatedAbsenceType,
          userId: currentUser.userId,
          user: currentUser,
          isApproved: false,
          comment: updatedComment
        });
      }
      alert('Du har redigert fraværet!');
    }

    onClose();
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
      <div className="modal-overlay pointer-events-none" onClick={onClose} />
      <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white px-10 pt-10 pb-5 rounded-[40px] ">
        <h2 className="modal-title text-center ">Fraværsskjema</h2>
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
          <div className="modal-buttons relative flex flex-col items-center justify-center pt-5">
            <Button
              type="submit"
              className="modal-submit-button button heading-xs px-4 py-2 rounded-full bg-primary text-white "
            >
              {buttonText}
            </Button>
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
