import SubmitButton from '../SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { updateAbsenceType } from '@/API/AbsenceTypeAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CalendarCellDisplay } from './CalendarCellDisplay';

type FormValues = {
  name: string;
  code: string;
  colorCode: string;
};

export default function UpdateAbsenceTypeComponent() {
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  //initialize postAbsence mutation
  /*   const { mutate: updateAbsenceTypeToDatabase } = useMutation({
    mutationFn: updateAbsenceType(1, {
      absenceTypeId: 1,
      name: 'test',
      code: 'test',
      colorCode: '#000000'
    }),

    onSuccess: () => queryClient.invalidateQueries(['absenceTypes'])
  }); */

  //initialize form values
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    code: '',
    colorCode: '#000000'
  });

  //update form values on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  //Post absence to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (formValues.name === '' || formValues.code === '' || formValues.colorCode === '#000000') {
      return;
    }
    e.preventDefault();

    /*     updateAbsenceTypeToDatabase({
      absenceTypeId: 1,
      name: formValues.name,
      code: formValues.code,
      colorCode: formValues.colorCode
    }); */

    //reset form values
    setFormValues({
      name: '',
      code: '',
      colorCode: '#000000'
    });

    // clear form fields
    const form = document.getElementById('AbsenceTypeForm') as HTMLFormElement;
    form.reset();

    alert('Fraværstypen ble lagt til!');
  };

  // disabled button until all fields are filled
  useEffect(() => {
    if (formValues.name === '' || formValues.code === '' || formValues.colorCode === '#000000') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formValues]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="absolute left-44 justify-end">
          <SubmitButton
            disabled={false}
            disabledTitle={'Tilbake'}
            buttonText={'Tilbake'}
            handleClick={() => {
              navigate('/admin');
            }}
          />
        </div>
        <h3 className="text-xl">Oppdater fraværstype</h3>
        <form className="flex flex-col items-center" onSubmit={handleSubmit} id="AbsenceTypeForm">
          <label className="mt-5" htmlFor="name">
            Navn på fraværstype:
          </label>
          <input
            className="modal-input w-full border-2 rounded-[20px] p-3 border-primary"
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />
          <label className="mt-5" htmlFor="colorCode">
            Velg farge:
          </label>
          <input
            className="border-2 border-gray-300 p-2 rounded-md"
            type="color"
            name="colorCode"
            id="colorCode"
            onChange={handleInputChange}
          />
          <label className="mt-5" htmlFor="code">
            Kode:
          </label>
          <input
            className="modal-input w-full border-2 rounded-[20px] p-3 border-primary"
            type="text"
            name="code"
            id="code"
            onChange={handleInputChange}
          />
          <br />
          {/* Preview Calendarcell component with and without hash */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl">Forhåndsvisning</h3>
            <br />
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-center">
                <p>Godkjent fravær:</p>
                <p>Ikke-godkjent fravær:</p>
              </div>
              <CalendarCellDisplay colorCode={formValues.colorCode} code={formValues.code} />
            </div>
          </div>
          <br />

          <Button
            type="submit"
            disabled={isDisabled}
            className="modal-submit-button button heading-xs px-4 py-2 rounded-full bg-primary text-white "
          >
            Oppdater fraværstype
          </Button>
        </form>
      </div>
    </div>
  );
}
