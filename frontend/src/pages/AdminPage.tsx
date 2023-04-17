import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import PageLayout from '@/components/PageLayout';
import SectionView from '@/components/AdminPage/SectionView';
import AbsenceTypeView from '@/components/AdminPage/AbsenceTypeView';
import TeamView from '@/components/AdminPage/TeamView';
import SubjectFieldView from '@/components/AdminPage/SubjectFieldView';
import DepartmentView from '@/components/AdminPage/DepartmentView';
import RoleView from '@/components/AdminPage/RoleView';
import UserTab from '@/components/AdminPage/UserView';
import Dropdown from '../components/Dropdown';

const tabLabels = ['Brukere', 'Fraværstyper', 'Avdeling', 'Seksjon', 'Fagområde', 'Team', 'Rolle'];

export default function AdminPage() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const currentUser = useUserContext();

  // midlertidig løsning for å beskytte siden mot ikke admins
  useEffect(() => {
    if (!currentUser.admin) {
      navigate('/');
    }
  }, [currentUser.admin, navigate]);

  //options for dropdown
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
                    backgroundColor: 'primary-contrast',
                    color: 'black',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
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
          <div className="block md:hidden mb-5 flex justify-center">
            <div className="w-4/5">
              <label htmlFor="fromDate" className="body-bold text-sm text-primary">
                Velg en fane:
              </label>
              <Dropdown
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
                {label === 'Brukere' && (
                  <div>
                    <UserTab />
                  </div>
                )}
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
