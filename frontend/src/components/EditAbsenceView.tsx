import { CommentField } from './CommentField';
import { DateField } from './DateField';
import { AbsenceRadioField } from './AbsenceRadioField';
import SubmitButton from './SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../context/UserContext';
import { Absence } from '../types/types';
import * as React from 'react';
import { FormValues } from './AbsenceForm';
import moment from 'moment';
import { useEffect } from 'react';
import {
  getDatePickerMaxForAbsence,
  getDatePickerMinForAbsence,
  updateAbsence
} from '../API/AbsenceAPI';
import { getAbsenceTypeById } from '../API/AbsenceTypeAPI';

async function setMax(currentUser: any, clickedAbsence: Absence, setNextAbsenceStartDate: any) {
  setNextAbsenceStartDate(
    await getDatePickerMaxForAbsence(currentUser.userId, clickedAbsence.endDate)
  );
}

async function setMin(currentUser: any, clickedAbsence: Absence, setPreviousAbsenceEndDate: any) {
  setPreviousAbsenceEndDate(
    await getDatePickerMinForAbsence(currentUser.userId, clickedAbsence.startDate)
  );
}

/**
 * Renders a view lets a user edit an absence
 */
export const EditAbsenceView = (props: { setAbsence: any; absence: Absence }) => {
  const queryClient = useQueryClient();

  const currentUser = useUserContext();

  const [nextAbsenceStartDate, setNextAbsenceStartDate] = React.useState<string>();
  const [previousAbsenceEndDate, setPreviousAbsenceEndDate] = React.useState<string>();

  //initialize mutation for updating an absence
  const { mutate: editAbsence } = useMutation({
    mutationFn: (absence: Absence) => updateAbsence(absence),
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }])
  });

  //initialize form values with current values for the absence selected for editing
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: moment(props.absence.startDate).format('YYYY-MM-DD'),
    endDate: moment(props.absence.endDate).format('YYYY-MM-DD'),
    comment: props.absence.comment,
    absenceType: props.absence.absenceTypeId
  });

  //update form values when another absence is selected
  useEffect(() => {
    setFormValues({
      startDate: moment(props.absence.startDate).format('YYYY-MM-DD'),
      endDate: moment(props.absence.endDate).format('YYYY-MM-DD'),
      comment: props.absence.comment,
      absenceType: props.absence.absenceTypeId
    });
    setMax(currentUser, props.absence, setNextAbsenceStartDate);
    setMin(currentUser, props.absence, setPreviousAbsenceEndDate);
  }, [props.absence]);

  //update form values on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  //Update absence in database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //get the updated absence type from database
    const updatedAbsenceType = (await getAbsenceTypeById(formValues.absenceType)).data;

    //Make comment undefined if it is an empty string
    let updatedComment;
    if (formValues.comment === '') {
      updatedComment = undefined;
    } else {
      updatedComment = formValues.comment;
    }
    editAbsence({
      absenceId: props.absence.absenceId,
      startDate: moment(formValues.startDate).toISOString(),
      endDate: moment(formValues.endDate).toISOString(),
      absenceTypeId: formValues.absenceType,
      type: updatedAbsenceType,
      userId: currentUser.userId,
      user: currentUser,
      isApproved: false,
      comment: updatedComment
    });
    //Alert user of edit success
    alert('Du har redigert fraværet!');
    //redirect to AddAbsenceView
    props.setAbsence(null);
  };

  return (
    <div className="h-[500px] w-[400px] relative">
      <h3 className="ml-[25px]">Rediger fravær</h3>
      <div className="h-[460px] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="m-auto flex flex-row justify-evenly w-[400px]">
            <DateField
              handleInputChange={handleInputChange}
              name="startDate"
              min={previousAbsenceEndDate}
              max={formValues.endDate}
              value={formValues.startDate}
              label="Fra"
              placeholder={new Date(props.absence.startDate).toLocaleDateString()}
            ></DateField>
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={new Date(
                moment(formValues.startDate).add(0, 'days').toISOString().split('T')[0]
              ).toLocaleDateString('fr-ca')}
              max={nextAbsenceStartDate}
              value={formValues.endDate}
              label="Til"
              placeholder={new Date(props.absence.endDate).toLocaleDateString()}
            ></DateField>
          </div>
          <div className="m-auto flex flex-col justify-evenly mt-[10px] w-[300px]">
            <AbsenceRadioField
              formValues={formValues}
              handleRadioChange={handleRadioChange}
            ></AbsenceRadioField>
            <CommentField
              handleInputChange={handleInputChange}
              placeholder={props.absence.comment}
              formValues={formValues}
            ></CommentField>
          </div>
          <div className="m-auto w-[300px] flex justify-center gap-[20px]">
            <SubmitButton
              disabledTitle={'Fyll ut alle feltene'}
              disabled={false}
              buttonText={'Rediger fravær'}
              type={'submit'}
            ></SubmitButton>
            <SubmitButton
              disabled={false}
              buttonText={'Avbryt'}
              handleClick={() => props.setAbsence(null)}
            ></SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
