import Select from 'react-select';

export default function DropdownMultiSelect() {
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
        placeholder={<div className="">Seksjon</div>}
        theme={(theme) => ({
          ...theme,
          borderRadius: 20,
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
