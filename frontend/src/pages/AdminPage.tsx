import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import { useUserContext } from '../context/UserContext';
import PageLayout from '@/components/PageLayout';
import SectionView from '@/components/AdminPage/SectionView';
import AbsenceTypeView from '@/components/AdminPage/AbsenceTypeView';

const tabLabels = ['Brukere', 'Fraværstyper', 'Avdeling', 'Seksjon', 'Fagfelt', 'Team', 'Rolle'];

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

  return (
    <PageLayout title="Adminpanel">
      <div className="absolute top-16 left-10 flex justify-end">
        <SubmitButton
          disabled={false}
          disabledTitle={'minside'}
          buttonText={'Til min side'}
          handleClick={() => {
            navigate('/profil');
          }}
        />
      </div>

      <div className="flex w-11/12 h-5/6">
        <TabContext value={value.toString()}>
          <div className=" flex flex-col">
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
                    backgroundColor: 'white',
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

          <div className="w-full border-1 border-primary-light rounded-r-xl overflow-y-auto">
            {tabLabels.map((label, index) => (
              <TabPanel key={index} value={index.toString()}>
                {label === 'Brukere' && <div>brukere</div>}
                {label === 'Fraværstyper' && <AbsenceTypeView />}
                {label === 'Avdeling' && <div>avdeling</div>}
                {label === 'Seksjon' && <SectionView />}
                {label === 'Fagfelt' && <div>fagfelt</div>}
                {label === 'Team' && <div>team</div>}
                {label === 'Rolle' && <div>rolle</div>}
              </TabPanel>
            ))}
          </div>
        </TabContext>
      </div>
    </PageLayout>
  );
}
