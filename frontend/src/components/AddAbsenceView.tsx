import { CommentField } from './CommentField';
import { DateField } from './DateField';
import { AbsenceRadioField } from './AbsenceRadioField';
import SubmitButton from './SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDatePickerMaxForAbsence,
  getDatePickerMinForAbsence,
  getDisableDates,
  postAbsence
} from '../API/AbsenceAPI';
import { useUserContext } from '../context/UserContext';
import { useGlobalContext } from '../context/GlobalContext';
import { FormValues } from './AbsenceForm';
import * as React from 'react';
import { Absence } from '../types/types';
import { useModalContext } from '@/context/ModalContext';

//get all absence dates in array
async function setDates(
  userId: number,
  setDisableDates: React.Dispatch<React.SetStateAction<Date[] | undefined>>
) {
  setDisableDates(await getDisableDates(userId));
}

//set max on datepicker state based on when the next absence starts
async function setMax(
  userId: number,
  startDate: Date | undefined,
  setNextAbsenceStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
) {
  if (startDate) {
    setNextAbsenceStartDate(await getDatePickerMaxForAbsence(userId, new Date(startDate)));
  }
}

//set min on datepicker state based when the previous absence ends
async function setMin(
  userId: number,
  startDate: Date | undefined,
  setPreviousAbsenceEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>
) {
  if (startDate) {
    setPreviousAbsenceEndDate(await getDatePickerMinForAbsence(userId, new Date(startDate)));
  }
}

/**
 * Renders a view lets a user add new absences
 */
export const AddAbsenceView = (props: { absences: Absence[] }) => {
  const queryClient = useQueryClient();
  const currentUser = useUserContext();
  const { absenceTypes } = useGlobalContext();

  const [previousAbsenceEndDate, setPreviousAbsenceEndDate] = React.useState<Date>();
  const [nextAbsenceStartDate, setNextAbsenceStartDate] = React.useState<Date>();
  const [disableDates, setDisableDates] = React.useState<Date[]>();
  const [isApproved, setIsApproved] = React.useState<boolean>(false);
  const { openMessageBox } = useModalContext();

  //initialize postAbsence mutation
  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => openMessageBox('Fraværet eksisterer allerede')
  });

  //initialize form values
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: undefined,
    endDate: undefined,
    comment: '',
    absenceType: absenceTypes[0].absenceTypeId
  });

  //get all dates that a user has registered an absence for in an array
  React.useEffect(() => {
    setDates(currentUser.userId, setDisableDates);
    setMax(currentUser.userId, formValues.startDate, setNextAbsenceStartDate);
    setMin(currentUser.userId, formValues.startDate, setPreviousAbsenceEndDate);
  }, [props.absences, formValues.startDate, currentUser]);

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

  //Post absence to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.startDate || !formValues.endDate) return;

    addAbsence({
      startDate: formValues.startDate.toISOString(),
      endDate: formValues.endDate.toISOString(),
      comment: formValues.comment,
      isApproved: isApproved,
      absenceTypeId: formValues.absenceType,
      userId: currentUser.userId
    });

    //reset values on submit
    setFormValues({
      startDate: undefined,
      endDate: undefined,
      comment: '',
      absenceType: absenceTypes[0].absenceTypeId
    });
  };

  const handleIsApprovedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsApproved(e.target.checked);
  };

  return (
    <div className="md:h-full w-full px-[50px] md:px-0 relative m-auto">
      <h3 className="md:ml-[25px] md:text-left text-center md:text-2xl text-xl">Legg til fravær</h3>
      <div className="md:h-full overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
        <form className="modal-form md:mx-6" onSubmit={handleSubmit}>
          <div className="m-auto flex flex-col md:flex-row md:gap-[20px] md:justify-evenly">
            <DateField
              handleInputChange={handleInputChange}
              name="startDate"
              min={previousAbsenceEndDate}
              max={formValues.endDate}
              value={formValues.startDate}
              label="Fra"
              disableArray={disableDates}
              title={''}
            ></DateField>
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={formValues.startDate}
              max={nextAbsenceStartDate}
              value={formValues.endDate}
              label="Til"
              disableArray={disableDates}
              disabled={formValues.startDate === undefined ? true : false}
              title={'Fyll ut startdato først'}
            ></DateField>
          </div>
          <div className="m-auto flex flex-col md:flex-col md:gap-[20px] md:justify-evenly mt-[10px] md:w-[350px]">
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
                  // eslint-disable-next-line react/no-unknown-property
                  className="space-x-5 h-5 w-5 accent-primary cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <SubmitButton
              disabledTitle={'Fyll ut alle feltene'}
              disabled={false}
              buttonText={'Lagre'}
              type={'submit'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
