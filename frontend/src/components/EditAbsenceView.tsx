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

//set max on datepicker state based on when the next absence starts
async function setMax(currentUser: any, clickedAbsence: Absence, setNextAbsenceStartDate: any) {
  setNextAbsenceStartDate(
    await getDatePickerMaxForAbsence(currentUser.userId, new Date(clickedAbsence.endDate))
  );
}

//set min on datepicker state based when the previous absence ends
async function setMin(currentUser: any, clickedAbsence: Absence, setPreviousAbsenceEndDate: any) {
  setPreviousAbsenceEndDate(
    await getDatePickerMinForAbsence(currentUser.userId, new Date(clickedAbsence.startDate))
  );
}

/**
 * Renders a view lets a user edit an absence
 */
export const EditAbsenceView = (props: { setAbsence: any; absence: Absence }) => {
  const queryClient = useQueryClient();

  const currentUser = useUserContext();

  const [nextAbsenceStartDate, setNextAbsenceStartDate] = React.useState<Date>(new Date());
  const [previousAbsenceEndDate, setPreviousAbsenceEndDate] = React.useState<Date>(new Date());
  const [isApproved, setIsApproved] = React.useState<boolean>(props.absence.isApproved);

  //initialize mutation for updating an absence
  const { mutate: editAbsence } = useMutation({
    mutationFn: (absence: Absence) => updateAbsence(absence),
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => alert('Fravær kunne ikke oppdateres')
  });

  //initialize form values with current values for the absence selected for editing
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: new Date(moment(props.absence.startDate).format('YYYY-MM-DD')),
    endDate: new Date(moment(props.absence.endDate).format('YYYY-MM-DD')),
    comment: props.absence.comment,
    absenceType: props.absence.absenceTypeId
  });

  //update form values when another absence is selected
  useEffect(() => {
    setFormValues({
      startDate: new Date(moment(props.absence.startDate).format('YYYY-MM-DD')),
      endDate: new Date(moment(props.absence.endDate).format('YYYY-MM-DD')),
      comment: props.absence.comment,
      absenceType: props.absence.absenceTypeId
    });

    //set min and max for datepicker based on other absences
    setMax(currentUser, props.absence, setNextAbsenceStartDate);
    setMin(currentUser, props.absence, setPreviousAbsenceEndDate);
  }, [props.absence]);

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
      startDate: moment(formValues.startDate).toISOString(true).split('+')[0] + 'Z',
      endDate: moment(formValues.endDate).toISOString(true).split('+')[0] + 'Z',
      absenceTypeId: formValues.absenceType,
      type: updatedAbsenceType,
      userId: currentUser.userId,
      user: currentUser,
      isApproved: isApproved,
      comment: updatedComment
    });
    //redirect to AddAbsenceView
    props.setAbsence(null);
  };

  const handleIsApprovedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsApproved(e.target.checked);
  };

  return (
    <div className="md:h-full w-full px-[50px] md:px-0 relative m-auto">
      <h3 className="md:ml-[25px] md:text-left text-center md:text-2xl text-xl">Rediger fravær</h3>
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
              title=""
            ></DateField>
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={formValues.startDate}
              max={nextAbsenceStartDate}
              value={formValues.endDate}
              label="Til"
              title=""
            ></DateField>
          </div>
          <div className="m-auto flex flex-col md:flex-row md:flex-col md:gap-[20px] md:justify-evenly mt-[10px] md:w-[350px]">
            <AbsenceRadioField
              formValues={formValues}
              handleRadioChange={handleRadioChange}
            ></AbsenceRadioField>
            <CommentField
              handleInputChange={handleTextAreaChange}
              placeholder={props.absence.comment}
              formValues={formValues}
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
          </div>
          <div className="m-auto flex justify-center gap-[20px] mt-2">
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
