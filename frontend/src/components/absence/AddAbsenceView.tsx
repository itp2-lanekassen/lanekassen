import { CommentField } from '../CommentField';
import { DateField } from '../DateField';
import { AbsenceRadioField } from '../AbsenceRadioField';
import SubmitButton from '../SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAbsence } from '@/api/absence';
import { useUserContext } from '@/context/UserContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { FormValues } from '../AbsenceForm';
import * as React from 'react';
import { Absence } from '@/types/interfaces';
import { useModalContext } from '@/context/ModalContext';
import useAbsenceMaxDate from '@/helpers/useAbsenceMaxDate';

/**
 * Renders a view that lets a user add new absences
 */
export const AddAbsenceView = (props: { absences: Absence[] }) => {
  const queryClient = useQueryClient();
  const currentUser = useUserContext();
  const { absenceTypes } = useGlobalContext();
  const { openMessageBox } = useModalContext();

  const [isApproved, setIsApproved] = React.useState<boolean>(false);

  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }]),
    onError: () => openMessageBox('Fraværet eksisterer allerede')
  });

  // Initialize form values
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: undefined,
    endDate: undefined,
    comment: '',
    absenceType: absenceTypes[0].absenceTypeId
  });

  const { disabledDates, maxToDate } = useAbsenceMaxDate(formValues.startDate, props.absences);

  // Update form values on date picker change
  const handleInputChange = (name: string, date?: Date) => {
    if (name === 'startDate') {
      setFormValues({
        ...formValues,
        startDate: date,
        endDate: undefined // reset endDate if startDate changes
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

  // Post absence to database
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

    // Reset values on submit
    setFormValues({
      startDate: undefined,
      endDate: undefined,
      comment: '',
      absenceType: absenceTypes[0].absenceTypeId
    });
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
              value={formValues.startDate}
              label="Fra"
              disableArray={disabledDates}
            />
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              value={formValues.endDate}
              label="Til"
              min={formValues.startDate}
              max={maxToDate}
              disableArray={disabledDates}
              disabled={formValues.startDate === undefined}
              title={'Fyll ut startdato først'}
            />
          </div>
          <div className="m-auto flex flex-col md:flex-col md:gap-[20px] md:justify-evenly mt-[10px] md:w-[350px]">
            <AbsenceRadioField formValues={formValues} handleRadioChange={handleRadioChange} />
            <CommentField formValues={formValues} handleInputChange={handleTextAreaChange} />
            {currentUser.admin && (
              <div className="flex items-center heading-xs space-x-5">
                <p onClick={() => setIsApproved(!isApproved)}>Godkjenn fravær</p>
                <input
                  type="checkbox"
                  id="isApproved"
                  checked={isApproved}
                  onChange={(e) => setIsApproved(e.target.checked)}
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
