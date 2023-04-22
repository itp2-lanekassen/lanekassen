import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { postAbsenceType } from '@/API/AbsenceTypeAPI';
import { useEffect, useState } from 'react';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import AbsenceTypeView from './AbsenceTypeView';
import ColorPickerComponent from './ColorPicker';
import InputAdornment from '@mui/material/InputAdornment';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { IconButton, Input } from '@mui/material';

type FormValues = {
  name: string;
  code: string;
  colorCode: string;
};

export default function AddAbsenceTypeComponent(props: {
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState('#000000');

  //initialize postAbsence mutation
  const { mutate: addAbsenceType } = useMutation({
    mutationFn: postAbsenceType,
    onSuccess: () => queryClient.invalidateQueries(['absenceTypes']),
    onError: () => alert('Fraværstypen eksisterer allerede')
  });

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

    addAbsenceType({
      name: formValues.name,
      code: formValues.code,
      colorCode: formValues.colorCode
    });

    //reset form values
    setFormValues({
      name: '',
      code: '',
      colorCode: '#000000'
    });

    // clear form fields
    const form = document.getElementById('AbsenceTypeForm') as HTMLFormElement;
    form.reset();

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
      <div className="flex flex-col items-center w-full">
        <h3 className="text-xl">Legg til ny fraværstype</h3>
        <form className="flex flex-col items-center" onSubmit={handleSubmit} id="AbsenceTypeForm">
          <label className="mt-2" htmlFor="name">
            Navn på fraværstype:
          </label>
          <input
            className="modal-input w-full border-2 rounded-[20px] p-1 px-3 border-primary"
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />

          <label className="mt-2" htmlFor="colorCode">
            Velg farge:
          </label>

          <div className="relative">
            <Input
              type="text"
              className="modal-input w-full border-2 rounded-[20px] p-1 px-3 border-primary mr-2"
              id="colorCode"
              name="colorCode"
              value={color}
              disableUnderline={true}
              onChange={(e) => {
                e.preventDefault();
                handleColorChange(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setOpen(!open)} sx={{ color: '#410464' }}>
                    <ColorLensIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            {open && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center">
                <ColorPickerComponent
                  onColorChange={handleColorChange}
                  setOpen={setOpen}
                  colorHook={color}
                />
              </div>
            )}
          </div>

          <label className="mt-2" htmlFor="code">
            Forkortelse (maks 7 tegn):
          </label>
          <input
            className="modal-input w-full border-2 rounded-[20px] p-1 px-3 border-primary"
            type="text"
            name="code"
            id="code"
            maxLength={7}
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
              Legg til
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
