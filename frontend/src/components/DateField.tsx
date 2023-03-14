import { ChangeEventHandler } from 'react';
import { FormValues } from './AbsenceForm';

/**
 * Renders a date field necessary for posting and editing absence
 */
export const DateField = (props: {
  name: string;
  formValues?: FormValues;
  label: string;
  max?: string;
  min?: string;
  value: string;
  handleInputChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
}) => {
  return (
    <div className="modal-field">
      <label htmlFor={props.name} className="block heading-xs">
        {props.label}
      </label>
      <input
        type="date"
        placeholder={props.placeholder}
        name={props.name}
        max={props.max}
        min={props.min}
        value={props.value}
        onChange={props.handleInputChange}
        className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center"
        required
      />
    </div>
  );
};
