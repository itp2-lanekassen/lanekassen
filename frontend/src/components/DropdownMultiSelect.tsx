import Select, { MultiValue, StylesConfig } from 'react-select';
import { IDropdownMultiSelect } from '../types/types';
import { TroubleshootSharp } from '@mui/icons-material';

/**
 *
 * @param placeholder is the "title" of the dropdown
 * @param listOfOptions is list of options retrieved from database
 * @param handleChange is the function that is called when a new option is selected
 * @param value is the value of the selected option
 * @returns dropdown component where multiselect is possible
 */

interface IOption {
  label: string;
  value: number;
}
export default function DropdownMultiSelect({
  handleChange,
  placeholder,
  listOfOptions,
  value,
  className,
  isDisabled
}: IDropdownMultiSelect) {
  const options = listOfOptions.map(({ name, id }) => ({ label: name, value: id }));

  const handleOnChange = (selectedOptions: MultiValue<IOption>) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: { value: any }) => option.value)
      : [];
    handleChange(selectedValues);
  };

  const customStyles: StylesConfig<any, true> = {
    menu: (base) => ({
      ...base,
      width: 'fit-content' + 'px-2'
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '500px'
    })
  };

  return (
    <div className="">
      <Select
        className={`text-primary w-80 ${className}`}
        options={options}
        placeholder={placeholder}
        isMulti
        value={
          value ? options.filter((option: { value: any }) => value.includes(option.value)) : []
        }
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
        styles={customStyles}
      />
    </div>
  );
}
