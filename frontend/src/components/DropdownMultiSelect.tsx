import Select from 'react-select';

export default function DropdownMultiSelect() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <div>
      <Select
        className="text-primary border-primary focus:border-primary w-80"
        options={options}
        placeholder="Avdeling"
        isMulti
        theme={(theme) => ({
          ...theme,
          borderRadius: 15,
          colors: {
            ...theme.colors,
            primary25: '#F6F0F9',
            primary: '#590689'
          }
        })}
      />
    </div>
  );
}
