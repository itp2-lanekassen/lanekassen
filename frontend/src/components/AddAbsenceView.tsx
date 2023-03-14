import { CommentField } from './CommentField';
import { DateField } from './DateField';
import { AbsenceRadioField } from './AbsenceRadioField';
import SubmitButton from './SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAbsence } from '../API/AbsenceAPI';
import { useUserContext } from '../context/UserContext';
import moment from 'moment';
import { useGlobalContext } from '../context/GlobalContext';
import { FormValues } from './AbsenceForm';
import * as React from 'react';

/**
 * Renders a view lets a user add new absences
 */
export const AddAbsenceView = () => {
  const queryClient = useQueryClient();

  const currentUser = useUserContext();
  const { absenceTypes } = useGlobalContext();

  //initialize postAbsence mutation
  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }])
  });

  //initialize form values
  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate: '',
    endDate: '',
    comment: '',
    absenceType: absenceTypes[0].absenceTypeId
  });

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

  //Post absence to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addAbsence({
      startDate: moment(formValues.startDate).toISOString(),
      endDate: moment(formValues.endDate).toISOString(),
      comment: formValues.comment,
      absenceTypeId: formValues.absenceType,
      userId: currentUser.userId
    });

    setFormValues({
      startDate: '',
      endDate: '',
      comment: '',
      absenceType: absenceTypes[0].absenceTypeId
    });

    alert('Fraværet ble lagt til!');
  };

  return (
    <div className="h-[500px] w-[400px] relative">
      <h3 className="ml-[25px]">Legg til fravær</h3>
      <div className="h-[460px] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="m-auto flex flex-row justify-evenly w-[400px]">
            <DateField
              handleInputChange={handleInputChange}
              name="startDate"
              max={formValues.endDate}
              value={formValues.startDate}
              label="Fra"
              formValues={formValues}
            ></DateField>
            <DateField
              handleInputChange={handleInputChange}
              name="endDate"
              min={formValues.startDate}
              value={formValues.endDate}
              label="Til"
              formValues={formValues}
            ></DateField>
          </div>
          <div className="m-auto flex flex-col justify-evenly mt-[10px] w-[300px]">
            <AbsenceRadioField
              formValues={formValues}
              handleRadioChange={handleRadioChange}
            ></AbsenceRadioField>
            <CommentField
              formValues={formValues}
              handleInputChange={handleInputChange}
            ></CommentField>
          </div>
          <div className="m-auto w-[300px] flex justify-center">
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
