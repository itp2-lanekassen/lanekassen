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
      className={className}
      isDisabled={isDisabled}
      menuPlacement="auto" // auto menu on top code
      placeholder={placeholder}
      isMulti
      options={options}
      value={value ? options.filter((option) => value.includes(option.value)) : []}
      onChange={(selectedOptions) => onChange(selectedOptions.map((o) => o.value))}
      theme={(theme) => ({
        ...theme,
        borderRadius: 20,
        colors: {
          ...theme.colors,
          primary25: '#F6F0F9', // option highlight color
          primary: '#590689', // selected color
          danger: '#590689',
          dangerLight: '#D8BCE6',
          neutral20: '#590689', // border color
          neutral30: '#590689', // border hover color
          neutral40: '',
          neutral60: '#590689',
          neutral80: '#410464' // selected option color
        }
      })}
      styles={{
        menu: (base) => ({
          ...base,
          width: 'fit-content',
          minWidth: '100%',
          overflow: 'hidden',
          color: '#590689'
        }),
        menuList: (base) => ({
          ...base,
          zIndex: 100,
          maxHeight: '250px',
          overflowX: 'hidden'
        })
      }}
    />
  );
};

export default DropdownMultiSelect;
