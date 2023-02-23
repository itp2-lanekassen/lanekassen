import { IDropdown } from '@/types/types';
import Select from 'react-select';

export default function DropdownMultiSelect({ placeholder }: IDropdown) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  //const options = listname.map((variable) => ({ label: variable, value: variable }));

  return (
    <div>
      <Select
        className="text-primary w-80"
        options={options}
        placeholder={<div className="">{placeholder}</div>}
        isMulti
        theme={(theme) => ({
          ...theme,
          borderRadius: 20,
          colors: {
            ...theme.colors,
            primary25: '#F6F0F9',
            primary: '#590689',
            danger: '#590689',
            dangerLight: '#D8BCE6'
          }
        })}
      />
    </div>
  );
}
