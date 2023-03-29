import SubmitButton from '../SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { updateAbsenceType } from '@/API/AbsenceTypeAPI';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import { AbsenceType } from '@/types/types';
import AbsenceTypeView from './AbsenceTypeView';

type FormValues = {
  name: string;
  code: string;
  colorCode: string;
};

export default function UpdateAbsenceTypeComponent(props: {
  absenceType: AbsenceType;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(true);

  //initialize form values
  const [formValues, setFormValues] = useState<FormValues>({
    name: props.absenceType.name,
    code: props.absenceType.code,
    colorCode: props.absenceType.colorCode
  });

  //update form values on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  //initialize postAbsence mutation
  const { mutate: updateAbsenceTypeToDatabase } = useMutation({
    mutationFn: (options: AbsenceType) => updateAbsenceType(options.absenceTypeId, options),
    onSuccess: () => queryClient.invalidateQueries(['absenceTypes'])
  });

  //Post absence to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (formValues.name === '' || formValues.code === '' || formValues.colorCode === '#000000') {
      return;
    }
    e.preventDefault();

    updateAbsenceTypeToDatabase({
      absenceTypeId: props.absenceType.absenceTypeId,
      name: formValues.name,
      code: formValues.code,
      colorCode: formValues.colorCode
    });
    alert('Fraværstypen ble oppdatert!');
    props.setView(<AbsenceTypeView />);
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
        <div className="absolute left-60 justify-end">
          <SubmitButton
            disabled={false}
            disabledTitle={'Tilbake'}
            buttonText={'Tilbake'}
            handleClick={() => {
              props.setView(<AbsenceTypeView />);
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
            value={formValues.name}
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
            value={formValues.colorCode}
            onChange={handleInputChange}
          />
          <label className="mt-5" htmlFor="code">
            Forkortelse:
          </label>
          <input
            className="modal-input w-full border-2 rounded-[20px] p-3 border-primary"
            type="text"
            name="code"
            id="code"
            value={formValues.code}
            onChange={handleInputChange}
          />
          <br />
          {/* Preview Calendarcell component with and without hash */}
          <label className="">Forhåndsvisning (Godkjent / ikke-godkjent):</label>
          <CalendarCellDisplay colorCode={formValues.colorCode} code={formValues.code} />

          <br />
          <button
            type="submit"
            disabled={isDisabled}
            className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light"
          >
            Oppdater
          </button>
        </form>
      </div>
    </div>
  );
}
