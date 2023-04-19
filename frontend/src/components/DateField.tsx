import { addDays, addWeeks, startOfMonth } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
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
  const datePickerRef = useRef<DatePicker>(null);

  const [tempDate, setTempDate] = useState<Date | null>(props.value || null);

  const onMonthChange = (date: Date) => {
    const firstDayOfMonth = startOfMonth(date);
    props.handleInputChange(firstDayOfMonth, undefined, props.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('handleKeyDown', tempDate, e.key);
    switch (e.key) {
      case 'ArrowLeft':
        setTempDate(addDays(tempDate || props.value!, -1));
        datePickerRef.current?.setSelected(addDays(tempDate || props.value!, -1));
        break;

      case 'ArrowRight':
        setTempDate(addDays(tempDate || props.value!, +1));
        datePickerRef.current?.setSelected(addDays(tempDate || props.value!, +1));
        break;

      case 'ArrowDown':
        setTempDate(addWeeks(tempDate || props.value!, +1));
        datePickerRef.current?.setSelected(addWeeks(tempDate || props.value!, +1));
        break;

      case 'ArrowUp':
        setTempDate(addWeeks(tempDate || props.value!, -1));
        datePickerRef.current?.setSelected(addWeeks(tempDate || props.value!, -1));
        break;

      case 'Enter':
        props.handleInputChange(tempDate, e, props.name);
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  };

  useEffect(() => {
    setTempDate(props.value || null);
  }, [props.value]);

  return (
    <div className="modal-field">
      <label htmlFor={props.name} className="block md:heading-xs base ">
        {props.label}
      </label>
      <DatePicker
        selected={tempDate}
        autoComplete="off"
        id="datePicker"
        excludeDates={props.disableArray}
        name={props.name}
        minDate={min}
        maxDate={max}
        calendarStartDay={1}
        onChange={handleInputChange}
        showWeekNumbers
        dateFormat="dd/MM/yyyy"
        className={`modal-input heading-2xs py-3 w-full border-2 rounded-[20px] border-primary text-center bg-primary-contrast disabled:bg-primary-contrast-lighter disabled:cursor-not-allowed disabled:opacity-50 disabled:text-primary-contrast-lighter ${
          props.customClass ? props.customClass : ''
        }`}
        required
        disabled={props.disabled}
        title={props.disabled === false ? props.title : props.title}
        onKeyDown={handleKeyDown}
        weekLabel="Uke"
        startOpen={false}
        ref={datePickerRef}
        onMonthChange={onMonthChange}
      />
    </div>
  );
};
