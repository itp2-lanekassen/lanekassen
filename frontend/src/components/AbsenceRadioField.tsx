import { useGlobalContext } from '../context/GlobalContext';
import { ChangeEventHandler } from 'react';
import { FormValues } from './AbsenceForm';
/**
 * Renders a radio component for absence types
 */
export const AbsenceRadioField = (props: {
  formValues?: FormValues;
  handleRadioChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  const { absenceTypes } = useGlobalContext();

  return (
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
              value={type.absenceTypeId}
              checked={props.formValues?.absenceType === type.absenceTypeId}
              onChange={props.handleRadioChange}
              required
            />
            &nbsp;<span>{type.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
