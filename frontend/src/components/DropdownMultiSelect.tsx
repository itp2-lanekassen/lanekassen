import Select from 'react-select';

export interface DropdownMultiselectProps {
  handleChange: (value: number[]) => void;
  value: number[];
  placeholder: string;
  listOfOptions: { name: string; id: number }[];
  className?: string;
  isExpands?: boolean;
  isDisabled: boolean;
}

export default function DropdownMultiSelect({
  handleChange,
  placeholder,
  listOfOptions,
  value,
  className,
  isExpands = true,
  isDisabled
}: DropdownMultiselectProps) {
  const options = listOfOptions.map(({ name, id }) => ({ label: name, value: id }));

  return (
    <div className="">
      <Select
        className={`text-primary w-80 ${className}`}
        options={options}
        isDisabled={isDisabled}
        placeholder={placeholder}
        isMulti
        value={value ? options.filter((option) => value.includes(option.value)) : []}
        onChange={(selectedOptions) => handleChange(selectedOptions.map((o) => o.value))}
        menuPlacement={isExpands ? 'auto' : 'bottom'}
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
