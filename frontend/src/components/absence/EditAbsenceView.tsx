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
import { updateAbsence } from '@/api/absence';
import { getAbsenceTypeById } from '@/api/absenceType';
import { useModalContext } from '@/context/ModalContext';
import useAbsenceMaxDate from '@/helpers/useAbsenceMaxDate';

interface EditAbsenceViewProps {
  setAbsence: React.Dispatch<React.SetStateAction<Absence | undefined>>;
  selectedAbsence: Absence;
  absences: Absence[];
}

/**
 * Renders a view that lets a user edit an absence in AbsenceView
 */
export const EditAbsenceView = (props: EditAbsenceViewProps) => {
  const queryClient = useQueryClient();
  const currentUser = useUserContext();
  const { openMessageBox } = useModalContext();

  const [isApproved, setIsApproved] = React.useState<boolean>(props.selectedAbsence.isApproved);

  const { mutate: editAbsence } = useMutation({
    mutationFn: (absence: Absence) => updateAbsence(absence),
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => openMessageBox('Fravær kunne ikke oppdateres')
  });

  // Initialize form values with current values for the absence selected for editing
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: new Date(props.selectedAbsence.startDate),
    endDate: new Date(props.selectedAbsence.endDate),
    comment: props.selectedAbsence.comment,
    absenceType: props.selectedAbsence.absenceTypeId
  });

  const { disabledDates, maxToDate } = useAbsenceMaxDate(
    formValues.startDate,
    props.absences,
    props.selectedAbsence
  );

  // Update form values when another absence is selected
  useEffect(() => {
    setFormValues({
      startDate: new Date(props.selectedAbsence.startDate),
      endDate: new Date(props.selectedAbsence.endDate),
      comment: props.selectedAbsence.comment,
      absenceType: props.selectedAbsence.absenceTypeId
    });
  }, [props.selectedAbsence]);

  // Update form values on date picker change
  const handleInputChange = (name: string, date?: Date) => {
    if (name === 'startDate') {
      setFormValues({
        ...formValues,
        startDate: date,
        endDate: undefined
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: date
      });
    }
  };

  // Update form values on comment change
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Update form values on radio change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      absenceType: Number(e.target.value)
    });
  };

  // Update absence in database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.startDate || !formValues.endDate) return;

    //get the updated absence type from database
    const updatedAbsenceType = (await getAbsenceTypeById(formValues.absenceType)).data;

    // Make comment undefined if it is an empty string
    let updatedComment;
    if (formValues.comment === '') {
      updatedComment = undefined;
    } else {
      updatedComment = formValues.comment;
    }
    editAbsence({
      absenceId: props.selectedAbsence.absenceId,
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
    // Redirect to AddAbsenceView
    props.setAbsence(undefined);
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
              value={formValues.startDate}
              disableArray={disabledDates}
              label="Fra"
            />
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={formValues.startDate}
              max={maxToDate}
              disableArray={disabledDates}
              value={formValues.endDate}
              label="Til"
              title={'Fyll ut startdato først'}
            />
          </div>
          <div className="m-auto flex flex-col md:gap-[20px] md:justify-evenly mt-[10px] md:w-[350px]">
            <AbsenceRadioField formValues={formValues} handleRadioChange={handleRadioChange} />
            <CommentField
              handleInputChange={handleTextAreaChange}
              placeholder={props.selectedAbsence.comment}
              formValues={formValues}
            />
            {currentUser.admin && (
              <div className="flex items-center heading-xs space-x-5">
                <p onClick={() => setIsApproved(!isApproved)}>Godkjenn fravær</p>
                <input
                  type="checkbox"
                  id="isApproved"
                  checked={isApproved}
                  onChange={(e) => setIsApproved(e.target.checked)}
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
