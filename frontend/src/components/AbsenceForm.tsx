import Button from '@material-tailwind/react/components/Button';
import * as React from 'react';
import '../index.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
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
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      radio: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Form submitted:', formValues);
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
                  className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary"
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
                  className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary"
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
                    <span className="ml-2 ">Tilgjengelig</span>
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
                    <span className="ml-2 ">Ikke tilgjengelig</span>
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
