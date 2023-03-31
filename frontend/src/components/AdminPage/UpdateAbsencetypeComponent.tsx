import SubmitButton from '../SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { updateAbsenceType } from '@/API/AbsenceTypeAPI';
import { useEffect, useState } from 'react';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import { AbsenceType } from '@/types/types';
import AbsenceTypeView from './AbsenceTypeView';
import ColorPickerComponent from './ColorPicker';

type FormValues = {
  name: string;
  code: string;
  colorCode: string;
};

export default function UpdateAbsenceTypeComponent(props: {
  absenceType: AbsenceType;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  //initialize form values
  const [formValues, setFormValues] = useState<FormValues>({
    name: props.absenceType.name,
    code: props.absenceType.code,
    colorCode: props.absenceType.colorCode
  });

  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState(formValues.colorCode);

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

  function handleColorChange(selectedColor: string) {
    setColor(selectedColor); // update state with selected color value
    setFormValues({
      ...formValues,
      colorCode: selectedColor
    });
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h3 className="text-xl">Oppdater fraværstype</h3>
        <form className="flex flex-col items-center" onSubmit={handleSubmit} id="AbsenceTypeForm">
          <label className="mt-2" htmlFor="name">
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
          <label className="mt-2" htmlFor="colorCode">
            Velg farge:
          </label>
          <div className="flex flex-row items-center">
            <input
              className="modal-input w-full border-2 rounded-[20px] p-3 border-primary mr-2"
              type="text"
              id="colorCode"
              name="colorCode"
              value={color}
              onChange={handleInputChange}
            />
            <button
              className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light"
              onClick={(e) => {
                e.preventDefault();
                open ? setOpen(false) : setOpen(true);
              }}
            >
              Velg farge
            </button>
            {open && (
              <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
                <ColorPickerComponent
                  onColorChange={handleColorChange}
                  setOpen={setOpen}
                  colorHook={color}
                />
              </div>
            )}
          </div>
          <label className="mt-2" htmlFor="code">
            Kode:
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
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isDisabled}
              className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light disabled:cursor-not-allowed"
            >
              Oppdater
            </button>
            <button
              className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light"
              onClick={() => {
                props.setView(<AbsenceTypeView />);
              }}
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
