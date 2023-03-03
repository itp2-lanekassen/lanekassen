import { IDropdown } from '@/types/types';
import Select from 'react-select';

/**
 *
 * @param placeholder is the "title" of the dropdown
 * @param listOfOptions is list of options retrieved from database
 * @returns dropdown component where multiselect is possible
 */
export default function DropdownMultiSelect({ placeholder, listOfOptions }: IDropdown) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  //console.log(listOfOptions);

  //const options = listOfOptions.map((variable: any) => ({ label: variable, value: variable }));

  return (
    <div className="mb-4">
      <Select
        className="text-primary w-80"
        options={options}
        placeholder={placeholder}
        isMulti
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
