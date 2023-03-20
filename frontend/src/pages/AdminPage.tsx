import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import { useUserContext } from '../context/UserContext';
import ellipse from '../assets/ellipse.png';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext } from '@mui/lab';
import { makeStyles, createStyles, withStyles } from '@mui/styles';

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
    <div className="w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="md:w-[70vw] mobile:w-[90vw] md:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Adminfunksjonalitet</h1>
      </div>

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

      <div className="mt-16 flex left-10 w-11/12 absolute">
        <TabContext value={value.toString()}>
          <div className=" flex flex-col">
            <Tabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              orientation="vertical"
              variant="scrollable"
              aria-label="My tabs"
              TabIndicatorProps={{ style: { backgroundColor: '#410464' } }}
            >
              {tabLabels.map((label, index) => (
                <CustomTab key={index} label={label} />
              ))}
            </Tabs>
          </div>

          <div className="w-full border-1 border-gray-200 rounded-r-xl">
            {tabLabels.map((label, index) => (
              <TabPanel key={index} value={index.toString()}>
                {/* Map components here */}
                {label}
              </TabPanel>
            ))}
          </div>
        </TabContext>
      </div>
    </div>
  );
}

const CustomTab = withStyles({
  root: {
    backgroundColor: 'white', // primary dark
    color: 'black',
    '&:hover': {
      backgroundColor: '#590689',
      color: 'white'
    },
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px'
  },
  selected: {
    backgroundColor: '#410464',
    color: 'white'
  }
})(Tab);
