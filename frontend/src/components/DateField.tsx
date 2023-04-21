import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Renders a date field necessary for posting and editing absence
 */
export const DateField = (props: {
  name: string;
  label?: string;
  max?: Date | undefined;
  min?: Date | undefined;
  value: Date | undefined;
  customClass?: string;
  handleInputChange: (
    date: Date | null,
    event: React.SyntheticEvent | undefined,
    name: string
  ) => void;
  placeholder?: string;
  disableArray?: Date[];
  disabled?: boolean;
  title?: string;
}) => {
  //update form values on input change
  const handleInputChange = (
    date: Date | null,
    e: React.SyntheticEvent<HTMLInputElement> | undefined
  ) => {
    props.handleInputChange(date, e, props.name);
  };

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
        minDate={props.min}
        maxDate={props.max}
        onChange={handleInputChange}
        showWeekNumbers
        dateFormat="dd/MM/yyyy"
        className={`modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center bg-primary-contrast disabled:bg-primary-contrast-lighter disabled:cursor-not-allowed disabled:opacity-50 disabled:text-primary-contrast-lighter ${
          props.customClass ? props.customClass : ''
        }`}
        required
        disabled={props.disabled}
        title={props.disabled === false ? props.title : props.title}
        weekLabel="Uke"
        startOpen={false}
      />
    </div>
  );
};
