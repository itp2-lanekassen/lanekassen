import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabPanel } from '@material-tailwind/react';

const AdminTabs = () => {
  const [value, setValue] = useState<number>(0);

  const tabLabels = ['Brukere', 'Fraværstyper', 'Avdeling', 'Seksjon', 'Fagfelt', 'Team', 'Rolle'];

  const getTabClassName = (index: number) => {
    const baseClassName = 'text-gray-500 hover:text-blue-500 rounded-lg border-purple-500 border';
    return value === index ? `bg-blue-100 text-blue-700 ${baseClassName}` : baseClassName;
  };

  return (
    <div className="flex flex-col h-full mt-10">
      <div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          className="h-full "
        >
          {tabLabels.map((label, index) => (
            <Tab label={label} key={index} className={getTabClassName(index)} />
          ))}
        </Tabs>
      </div>
      {tabLabels.map((label, index) => (
        <TabPanel key={index} value={value}>
          {/* Replace this with your component for this tab */}
          <div>{label} Content</div>
        </TabPanel>
      ))}
    </div>
  );
};

export default AdminTabs;
