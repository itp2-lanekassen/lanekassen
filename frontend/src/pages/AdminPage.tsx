import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useState } from 'react';
import PageLayout from '@/pages/PageLayout';
import SectionView from '@/components/admin/section/SectionView';
import AbsenceTypeView from '@/components/admin/absenceType/AbsenceTypeView';
import TeamView from '@/components/admin/team/TeamView';
import SubjectFieldView from '@/components/admin/subjectField/SubjectFieldView';
import DepartmentView from '@/components/admin/department/DepartmentView';
import RoleView from '@/components/admin/role/RoleView';
import UserTab from '@/components/admin/user/UserView';
import Dropdown from '@/components/Dropdown';

const tabLabels = ['Brukere', 'Fraværstyper', 'Avdeling', 'Seksjon', 'Fagområde', 'Team', 'Rolle'];

export default function AdminPage() {
  const [value, setValue] = useState(0);

  const dropdownOptions = tabLabels.map((label, index) => ({
    label,
    value: index
  }));

  const handleDropdownChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageLayout title="Admin">
      <div className="flex flex-col justify-center md:flex-row md:w-11/12 mt-5 pr-1 pl-1">
        <TabContext value={value.toString()}>
          <div className="hidden md:block">
            <Tabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              orientation="vertical"
              variant="scrollable"
              aria-label="My tabs"
              TabIndicatorProps={{ style: { backgroundColor: '#590689' } }} // primary-light
            >
              {tabLabels.map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  sx={{
                    backgroundColor: '#FAFAFA',
                    color: 'black',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    alignItems: 'flex-start',
                    '&:hover': {
                      backgroundColor: '#F6F0F9', // primary-lighter
                      color: '#410464', // primary
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px'
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#590689', // primary-light
                      color: '#FAFAFA', // grey-lightest
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px'
                    }
                  }}
                />
              ))}
            </Tabs>
          </div>
          <div className="md:hidden mb-5 flex justify-center">
            <div className="w-4/5">
              <label htmlFor="tabPicker" className="body-bold text-sm text-primary">
                Velg en fane:
              </label>
              <Dropdown
                id="tabPicker"
                options={dropdownOptions}
                value={value}
                onChange={handleDropdownChange}
                placeholder="Velg en side"
                className="content-center"
              />
            </div>
          </div>
          <div className="w-full border-1 border-primary-light rounded-r-xl rounded-l-xl md:rounded-l-none overflow-y-auto h-3/5-screen">
            {tabLabels.map((label, index) => (
              <TabPanel key={index} value={index.toString()}>
                {label === 'Brukere' && <UserTab />}
                {label === 'Fraværstyper' && <AbsenceTypeView />}
                {label === 'Avdeling' && <DepartmentView />}
                {label === 'Seksjon' && <SectionView />}
                {label === 'Fagområde' && <SubjectFieldView />}
                {label === 'Team' && <TeamView />}
                {label === 'Rolle' && <RoleView />}
              </TabPanel>
            ))}
          </div>
        </TabContext>
      </div>
    </PageLayout>
  );
}
