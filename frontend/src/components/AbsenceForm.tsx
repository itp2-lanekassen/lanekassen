import Button from '@material-tailwind/react/components/Button';
import * as React from 'react';
import '../index.css';
import { postAbsence } from '../API/AbsenceAPI';
import { NewAbsence } from '../types/types';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  input1: string;
  input2: string;
  input3: string;
  radio: string;
};

const ModalForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    input1: '',
    input2: '',
    input3: '',
    radio: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    if (name === 'input1') {
      const input2Element = document.getElementById('input2') as HTMLInputElement;
      input2Element.min = value;
    }
    if (name === 'input2') {
      const input1Element = document.getElementById('input1') as HTMLInputElement;
      input1Element.max = value;
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      radio: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let absenceTypeId2 = 0;

    if (formValues.radio === 'option1') {
      absenceTypeId2 = 746969;
    }

    if (formValues.radio === 'option2') {
      absenceTypeId2 = 746970;
    }

    if (formValues.radio === 'option3') {
      absenceTypeId2 = 746971;
    }

    const stringToAdd = 'T13:07:20.831Z'; // To have same format as date in database
    const newAbscence = {
      startDate: formValues.input1 + stringToAdd,
      endDate: formValues.input2 + stringToAdd,
      comment: formValues.input3,
      absenceTypeId: absenceTypeId2,
      userId: 666969 // TODO: Fix real userid
    };

    await postAbsence(newAbscence as NewAbsence);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="modal-overlay pointer-events-none" onClick={onClose} />
          <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white px-10 pt-10 pb-5 rounded-[40px] ">
            <h2 className="modal-title text-center ">Fraværsskjema</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-field">
                <label htmlFor="input1" className="block heading-xs">
                  Fra
                </label>
                <input
                  type="date"
                  id="input1"
                  name="input1"
                  value={formValues.input1}
                  onChange={handleInputChange}
                  className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center"
                  required
                />
              </div>
              <div className="modal-field">
                <label htmlFor="input2" className="block heading-xs">
                  Til
                </label>
                <input
                  type="date"
                  id="input2"
                  name="input2"
                  value={formValues.input2}
                  onChange={handleInputChange}
                  className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center"
                  required
                />
              </div>
              <div className="modal-field">
                <div className="heading-xs block pb-2">Type fravær</div>
                <div className="bg-card-one-dark rounded-[20px] py-4 flex flex-col px-10">
                  <label className="inline-flex items-center heading-2xs">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 accent-primary"
                      name="radio"
                      value="option1"
                      checked={formValues.radio === 'option1'}
                      onChange={handleRadioChange}
                      required
                    />
                    <span className="ml-2 ">Fravær, tilgjengelig for fjernarbeid</span>
                  </label>

                  <label className="inline-flex items-center heading-2xs">
                    <input
                      type="radio"
                      className="h-4 w-4 accent-primary"
                      name="radio"
                      value="option2"
                      checked={formValues.radio === 'option2'}
                      onChange={handleRadioChange}
                      required
                    />
                    <span className="ml-2 ">Fravær, ikke tilgjengelig</span>
                  </label>

                  <label className="inline-flex items-center heading-2xs">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 accent-primary"
                      name="radio"
                      value="option3"
                      checked={formValues.radio === 'option3'}
                      onChange={handleRadioChange}
                      required
                    />
                    <span className="ml-2">Permisjon/sykemeldt</span>
                  </label>
                </div>
              </div>

              <div className="modal-field">
                <label htmlFor="input3" className="block heading-xs pb-2 pt-3">
                  Personlig notis
                </label>
                <textarea
                  id="input3"
                  name="input3"
                  value={formValues.input3}
                  onChange={handleInputChange}
                  className="modal-input w-full border-2 rounded-[20px] border-primary"
                  rows={3}
                  style={{ padding: '12px' }}
                />
              </div>
              <div className="modal-buttons relative flex flex-col items-center justify-center pt-5">
                <Button
                  type="submit"
                  className="modal-submit-button button heading-xs px-4 py-2 rounded-full bg-primary text-white "
                >
                  Legg til
                </Button>
              </div>
            </form>
            <button
              type="button"
              className="modal-cancel-button absolute top-5 right-5 text-primary"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalForm;
