import { CommentField } from '../CommentField';
import { DateField } from '../DateField';
import { AbsenceRadioField } from '../AbsenceRadioField';
import SubmitButton from '../SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '@/context/UserContext';
import { Absence } from '@/types/interfaces';
import * as React from 'react';
import { FormValues } from '../AbsenceForm';
import { useEffect } from 'react';
import {
  getDatePickerMaxForAbsence,
  getDatePickerMinForAbsence,
  updateAbsence
} from '@/api/absence';
import { getAbsenceTypeById } from '@/api/absenceType';
import { useModalContext } from '@/context/ModalContext';

//set max on datepicker state based on when the next absence starts
async function setMax(
  userId: number,
  clickedAbsence: Absence,
  setNextAbsenceStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
) {
  setNextAbsenceStartDate(
    await getDatePickerMaxForAbsence(userId, new Date(clickedAbsence.endDate))
  );
}

//set min on datepicker state based when the previous absence ends
async function setMin(
  userId: number,
  clickedAbsence: Absence,
  setPreviousAbsenceEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>
) {
  setPreviousAbsenceEndDate(
    await getDatePickerMinForAbsence(userId, new Date(clickedAbsence.startDate))
  );
}

interface EditAbsenceViewProps {
  setAbsence: React.Dispatch<React.SetStateAction<Absence | undefined>>;
  absence: Absence;
}

/**
 * Renders a view lets a user edit an absence
 */
export const EditAbsenceView = (props: EditAbsenceViewProps) => {
  const queryClient = useQueryClient();

  const currentUser = useUserContext();

  const [nextAbsenceStartDate, setNextAbsenceStartDate] = React.useState<Date>();
  const [previousAbsenceEndDate, setPreviousAbsenceEndDate] = React.useState<Date>();
  const [isApproved, setIsApproved] = React.useState<boolean>(props.absence.isApproved);
  const { openMessageBox } = useModalContext();

  //initialize mutation for updating an absence
  const { mutate: editAbsence } = useMutation({
    mutationFn: (absence: Absence) => updateAbsence(absence),
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => openMessageBox('Fravær kunne ikke oppdateres')
  });

  //initialize form values with current values for the absence selected for editing
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: new Date(props.absence.startDate),
    endDate: new Date(props.absence.endDate),
    comment: props.absence.comment,
    absenceType: props.absence.absenceTypeId
  });

  //update form values when another absence is selected
  useEffect(() => {
    setFormValues({
      startDate: new Date(props.absence.startDate),
      endDate: new Date(props.absence.endDate),
      comment: props.absence.comment,
      absenceType: props.absence.absenceTypeId
    });

    //set min and max for datepicker based on other absences
    setMax(currentUser.userId, props.absence, setNextAbsenceStartDate);
    setMin(currentUser.userId, props.absence, setPreviousAbsenceEndDate);
  }, [props.absence, currentUser]);

  //update form values on date picker change
  const handleInputChange = (name: string, date?: Date) => {
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

    if (!formValues.startDate || !formValues.endDate) return;

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
      startDate: formValues.startDate.toISOString(),
      endDate: formValues.endDate.toISOString(),
      absenceTypeId: formValues.absenceType,
      // TODO: should only need id
      type: updatedAbsenceType,
      userId: currentUser.userId,
      user: currentUser,
      isApproved: currentUser.admin ? isApproved : false,
      comment: updatedComment
    });
    //redirect to AddAbsenceView
    props.setAbsence(undefined);
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
            />
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={formValues.startDate}
              max={nextAbsenceStartDate}
              value={formValues.endDate}
              label="Til"
            />
          </div>
          <div className="m-auto flex flex-col md:gap-[20px] md:justify-evenly mt-[10px] md:w-[350px]">
            <AbsenceRadioField formValues={formValues} handleRadioChange={handleRadioChange} />
            <CommentField
              handleInputChange={handleTextAreaChange}
              placeholder={props.absence.comment}
              formValues={formValues}
            />
            {currentUser.admin && (
              <div className="flex items-center heading-xs space-x-5">
                <p onClick={() => setIsApproved(!isApproved)}>Godkjenn fravær</p>
                <input
                  type="checkbox"
                  id="isApproved"
                  checked={isApproved}
                  onChange={handleIsApprovedChange}
                  className="space-x-5 h-5 w-5 accent-primary "
                />
              </div>
            )}
          </div>
          <div className="m-auto flex justify-center gap-[20px] mt-2">
            <SubmitButton
              disabledTitle={'Fyll ut alle feltene'}
              disabled={false}
              buttonText={'Lagre'}
              type={'submit'}
            />
            <SubmitButton
              disabled={false}
              buttonText={'Avbryt'}
              handleClick={() => props.setAbsence(undefined)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
