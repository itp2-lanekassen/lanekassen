import ReactSelect from 'react-select';
import { DropdownProps } from './Dropdown';

interface DropdownMultiSelectProps<T> extends Omit<DropdownProps<T>, 'value' | 'onChange'> {
  value: T[];
  onChange: (val: T[]) => void;
}

const DropdownMultiSelect = <T extends number | string>({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  isDisabled = false
}: DropdownMultiSelectProps<T>) => {
  return (
    <ReactSelect
      className={`text-primary ${className}`}
      options={options}
      isDisabled={isDisabled}
      placeholder={placeholder}
      isMulti
      value={value ? options.filter((option) => value.includes(option.value)) : []}
      onChange={(selectedOptions) => onChange(selectedOptions.map((o) => o.value))}
      theme={(theme) => ({
        ...theme,
        borderRadius: 20,
        colors: {
          ...theme.colors,
          primary25: '#F6F0F9', // option highlight color
          primary: '#590689', // selected color
          neutral20: '#590689', // border color
          neutral30: '#590689', // border hover color
          neutral80: '#410464' // selected option color
        }
      })}
      styles={{
        menu: (base) => ({
          ...base,
          width: 'fit-content',
          overflow: 'hidden',
          color: '#590689'
        }),
        menuList: (base) => ({
          ...base,
          zIndex: 100,
          maxHeight: '250px'
        })
      }}
    />
  );
};

export default DropdownMultiSelect;
