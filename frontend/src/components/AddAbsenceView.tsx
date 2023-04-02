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
import moment from 'moment';
import { useGlobalContext } from '../context/GlobalContext';
import { FormValues } from './AbsenceForm';
import * as React from 'react';
import { Absence } from '../types/types';

//get all absence dates in array
async function setDates(currentUser: any, setDisableDates: any) {
  setDisableDates(await getDisableDates(currentUser.userId));
}

//set max on datepicker state based on when the next absence starts
async function setMax(currentUser: any, startDate: Date | undefined, setNextAbsenceStartDate: any) {
  if (startDate) {
    setNextAbsenceStartDate(
      await getDatePickerMaxForAbsence(currentUser.userId, new Date(startDate))
    );
  }
}

//set min on datepicker state based when the previous absence ends
async function setMin(
  currentUser: any,
  startDate: Date | undefined,
  setPreviousAbsenceEndDate: any
) {
  if (startDate) {
    setPreviousAbsenceEndDate(
      await getDatePickerMinForAbsence(currentUser.userId, new Date(startDate))
    );
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

  //initialize postAbsence mutation
  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => alert('Fraværet eksisterer allerede')
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
    setDates(currentUser, setDisableDates);
    setMax(currentUser, formValues.startDate, setNextAbsenceStartDate);
    setMin(currentUser, formValues.startDate, setPreviousAbsenceEndDate);
  }, [props.absences]);

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

  //Post absence to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAbsence({
      startDate: moment(formValues.startDate).toISOString(true).split('+')[0] + 'Z',
      endDate: moment(formValues.endDate).toISOString(true).split('+')[0] + 'Z',
      comment: formValues.comment,
      isApproved: false,
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

  return (
    <div className="md:h-[500px] w-full px-[50px] md:px-0 relative m-auto">
      <h3 className="md:ml-[25px] md:text-left text-center md:text-2xl text-xl">Legg til fravær</h3>
      <div className="md:h-[460px] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
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
            ></DateField>
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={formValues.startDate}
              max={nextAbsenceStartDate}
              value={formValues.endDate}
              label="Til"
              disableArray={disableDates}
            ></DateField>
          </div>
          <div className="m-auto flex flex-col md:flex-row md:flex-col md:gap-[20px] md:justify-evenly mt-[10px] md:w-[350px]">
            <AbsenceRadioField
              formValues={formValues}
              handleRadioChange={handleRadioChange}
            ></AbsenceRadioField>
            <CommentField
              formValues={formValues}
              handleInputChange={handleTextAreaChange}
            ></CommentField>
          </div>
          <div className="m-auto flex justify-center gap-[20px]">
            <SubmitButton
              disabledTitle={'Fyll ut alle feltene'}
              disabled={false}
              buttonText={'Legg til fravær'}
              type={'submit'}
            ></SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
