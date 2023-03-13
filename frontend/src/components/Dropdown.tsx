import { IDropdown } from '../types/types';
import Select from 'react-select';

/**
 *
 * @param placeholder is the "title" of the dropdown
 * @param listOfOptions is list of options retrieved from database
 * @param handleChange is the function that is called when a new option is selected
 * @param value is the value of the selected option
 * @returns dropdown component
 */

export default function Dropdown({
  handleChange,
  placeholder,
  listOfOptions,
  value,
  className
}: IDropdown) {
  const options = listOfOptions.map(({ name, id }) => ({ label: name, value: id }));

  const handleOnChange = (selectedOption: any) => {
    handleChange(selectedOption.value);
  };

  return (
    <div className="mb-4">
      <Select
        className={`text-primary w-80 ${className}`}
        options={options}
        placeholder={placeholder}
        value={value === -1 ? null : options.find((option) => option.value === value)}
        onChange={handleOnChange}
        theme={(theme: { colors: any }) => ({
          ...theme,
          borderRadius: 20,
          colors: {
            ...theme.colors,
            primary25: '#F6F0F9',
            primary: '#590689',
            danger: '#590689',
            dangerLight: '#D8BCE6',
            neutral20: '#590689',
            neutral30: '#590689',
            neutral50: '#410464',
            neutral40: '',
            neutral60: '#590689',
            neutral80: '#410464'
          }
        })}
      />
    </div>
  );
}
