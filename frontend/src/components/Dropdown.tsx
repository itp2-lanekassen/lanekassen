import Select, { StylesConfig } from 'react-select';

interface DropdownProps {
  handleChange: (value: number) => void;
  value: number;
  placeholder: string;
  listOfOptions: { name: string; id: number }[];
  className?: string;
  cusTheme?: boolean;
  isDisabled: boolean;
}

export default function Dropdown({
  handleChange,
  placeholder,
  listOfOptions,
  value,
  className,
  isDisabled
}: DropdownProps) {
  const options = listOfOptions.map(({ name, id }) => ({ label: name, value: id }));

  const customStyles: StylesConfig<any, false> = {
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
    <div>
      <Select
        className={`text-primary w-80 ${className}`}
        isDisabled={isDisabled}
        options={options}
        placeholder={placeholder}
        value={value === -1 ? null : options.find((option) => option.value === value)}
        onChange={(option) => option && handleChange(option.value)}
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
