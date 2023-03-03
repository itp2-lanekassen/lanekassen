import { IDropdown, IDropdownMultiSelect } from '../types/types';
import Select, { MultiValue, ActionMeta } from 'react-select';

/**
 *
 * @param placeholder is the "title" of the dropdown
 * @param listOfOptions is list of options retrieved from database
 * @returns dropdown component where multiselect is possible
 */

interface IOption {
  label: string;
  value: number;
}
export default function DropdownMultiSelect({
  handleChange,
  placeholder,
  listOfOptions
}: IDropdownMultiSelect) {
  const options = listOfOptions.map(({ name, id }) => ({ label: name, value: id }));

  const handleOnChange = (selectedOptions: MultiValue<IOption>) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    handleChange(selectedValues);
  };

  return (
    <div className="mb-4">
      <Select
        className="text-primary w-80"
        options={options}
        placeholder={placeholder}
        isMulti
        onChange={handleOnChange}
        theme={(theme) => ({
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
