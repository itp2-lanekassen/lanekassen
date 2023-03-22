import moment from 'moment';
import { ChangeEventHandler } from 'react';
import { FormValues } from './AbsenceForm';

/**
 * Renders a date field necessary for posting and editing absence
 */
export const DateField = (props: {
  name: string;
  formValues?: FormValues;
  label: string;
  max?: string | undefined;
  min?: string;
  value: string;
  handleInputChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
}) => {
  //adjust props.max so it disables the correct dates in datepicker
  let max = props.max;
  if (props.max) {
    max = new Date(props.max.split('T')[0]).toLocaleDateString('fr-ca');
  }

  //adjust props.min so it disables the correct dates in datepicker
  let min = props.min;
  if (props.min) {
    min = new Date(moment(props.min).add(2, 'days').toISOString().split('T')[0]).toLocaleDateString(
      'fr-ca'
    );
    if (props.min === props.value) {
      min = new Date(props.min.split('T')[0]).toLocaleDateString('fr-ca');
    }
  }
  return (
    <div className="modal-field">
      <label htmlFor={props.name} className="block heading-xs">
        {props.label}
      </label>
      <input
        type="date"
        placeholder={props.placeholder}
        name={props.name}
        max={max}
        min={min}
        value={props.value}
        onChange={props.handleInputChange}
        className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center"
        required
      />
    </div>
  );
};
