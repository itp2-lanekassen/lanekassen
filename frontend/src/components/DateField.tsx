import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Renders a date field necessary for posting and editing absence
 */
export const DateField = (props: {
  name: string;
  label: string;
  max?: Date | undefined;
  min?: Date | undefined;
  value: Date | undefined;
  handleInputChange: (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined,
    name: string
  ) => void;
  placeholder?: string;
  disableArray?: Date[];
  disabled?: boolean;
  title: string;
}) => {
  //update form values on input change
  const handleInputChange = (
    date: Date | null,
    e: React.SyntheticEvent<HTMLInputElement> | undefined
  ) => {
    props.handleInputChange(date, e, props.name);
  };
  //set max to null if it is undefined
  let max = null;
  if (props.max) {
    max = props.max;
  }

  //set min to null if it is undefined
  let min = null;
  if (props.min) {
    min = props.min;
  }

  return (
    <div className="modal-field">
      <label htmlFor={props.name} className="block md:heading-xs base ">
        {props.label}
      </label>
      <DatePicker
        selected={props.value}
        autoComplete="off"
        id="datePicker"
        excludeDates={props.disableArray}
        name={props.name}
        minDate={min}
        maxDate={max}
        value={props.value?.toLocaleDateString()}
        onChange={handleInputChange}
        className="modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center bg-primary-contrast disabled:bg-primary-contrast-lighter disabled:cursor-not-allowed disabled:opacity-50 disabled:text-primary-contrast-lighter "
        required
        disabled={props.disabled}
        title={props.disabled === false ? props.title : props.title}
      />
    </div>
  );
};
