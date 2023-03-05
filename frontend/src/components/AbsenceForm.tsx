import { Button } from '@material-tailwind/react';
import * as React from 'react';
import moment from 'moment';
import { postAbsence } from '@/API/AbsenceAPI';
import { useUserContext } from '@/context/UserContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ModalProps = {
  startDate?: string;
  onClose: () => void;
};

type FormValues = {
  startDate: string;
  endDate: string;
  comment: string;
  absenceType: number;
};

const AbsenceForm: React.FC<ModalProps> = ({ onClose, startDate = '' }) => {
  const queryClient = useQueryClient();

  const { currentUser } = useUserContext();
  const { absenceTypes } = useGlobalContext();

  const { mutate: addAbsence } = useMutation({
    mutationFn: postAbsence,
    onSuccess: () => queryClient.invalidateQueries(['absences', { userId: currentUser.userId }])
  });

  const [formValues, setFormValues] = React.useState<FormValues>({
    startDate,
    endDate: '',
    comment: '',
    absenceType: absenceTypes[0].absenceTypeId
  });

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      absenceType: Number(e.target.value)
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addAbsence({
      startDate: moment(formValues.startDate).toISOString(),
      endDate: moment(formValues.endDate).toISOString(),
      comment: formValues.comment,
      absenceTypeId: formValues.absenceType,
      userId: currentUser.userId
    });
    onClose();
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
      <div className="modal-overlay pointer-events-none" onClick={onClose} />
      <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white px-10 pt-10 pb-5 rounded-[40px] ">
        <h2 className="modal-title text-center ">Fraværsskjema</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="startDate" className="block heading-xs">
              Fra
            </label>
            <input
              type="date"
              name="startDate"
              max={formValues.endDate}
              value={formValues.startDate}
              onChange={handleInputChange}
              className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center"
              required
            />
          </div>
          <div className="modal-field">
            <label htmlFor="endDate" className="block heading-xs">
              Til
            </label>
            <input
              type="date"
              name="endDate"
              min={formValues.startDate}
              value={formValues.endDate}
              onChange={handleInputChange}
              className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center"
              required
            />
          </div>
          <div className="modal-field">
            <div className="heading-xs block pb-2">Type fravær</div>
            <div className="bg-card-one-dark rounded-[20px] p-4 flex flex-col">
              {absenceTypes.map((type) => (
                <label
                  key={type.absenceTypeId}
                  className="inline-flex justify-start items-center heading-2xs"
                >
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 accent-primary"
                    name="absenceType"
                    value={type.absenceTypeId}
                    checked={formValues.absenceType === type.absenceTypeId}
                    onChange={handleRadioChange}
                    required
                  />
                  &nbsp;<span>{type.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label htmlFor="comment" className="block heading-xs pb-2 pt-3">
              Personlig notis
            </label>
            <textarea
              name="comment"
              value={formValues.comment}
              onChange={handleInputChange}
              className="modal-input w-full border-2 rounded-[20px] p-3 border-primary"
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
  );
};

export default AbsenceForm;
