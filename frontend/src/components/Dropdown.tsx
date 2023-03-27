import ReactSelect from 'react-select';

export interface DropdownProps<T> {
  options: { label: string; value: T }[];
  value?: T;
  onChange: (value: T) => void;
  placeholder: string;
  className?: string;
  isDisabled?: boolean;
}

const Dropdown = <T extends number | string>({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  isDisabled = false
}: DropdownProps<T>) => {
  return (
    <ReactSelect
      className={className}
      isDisabled={isDisabled}
      menuPlacement="auto" // auto menu on top code
      placeholder={placeholder}
      options={options}
      value={value !== undefined && options.find((option) => option.value === value)}
      onChange={(option) => option && onChange(option.value)}
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

export default Dropdown;
