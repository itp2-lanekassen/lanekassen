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
      options={options}
      placeholder={placeholder}
      value={value && options.find((option) => option.value === value)}
      onChange={(option) => option && onChange(option.value)}
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

export default Dropdown;
