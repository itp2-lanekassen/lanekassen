import { addDays, addWeeks, startOfMonth } from 'date-fns';
import { useRef, useState } from 'react';
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

  const onMonthChange = (date: Date) => {
    const firstDayOfMonth = startOfMonth(date);
    props.handleInputChange(firstDayOfMonth, undefined, props.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('handleKeyDown', props.name, e.key);
    switch (e.key) {
      case 'ArrowLeft':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datePickerRef.current?.setSelected(addDays(props.value!, -1));
        break;

      case 'ArrowRight':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datePickerRef.current?.setSelected(addDays(props.value!, +1));
        break;

      case 'ArrowDown':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datePickerRef.current?.setSelected(addWeeks(props.value!, +1));
        break;

      case 'ArrowUp':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datePickerRef.current?.setSelected(addWeeks(props.value!, -1));
        break;

      case 'Enter':
        props.handleInputChange(props.value!, e, props.name);
        e.preventDefault();
        e.stopPropagation();
        break;
    }
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
