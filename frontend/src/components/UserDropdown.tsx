import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Department, User } from '@/types/types';
import { userInfo } from 'os';
import { getDepartmentById } from '@/API/DepartmentAPI';

// hent seksjon, department osv
// bruk get-funksjoner kanskje?
// paste inn seksjon, department osv
// skjul editknappen hos andre brukere hvis ikke admin
// style bra
// add funksjonalitet til egen editknapp

export default function UserDropdown(props: {
  user: User;
  isCurrentUser: boolean;
  isAdmin: boolean;
}) {
  const [expandStatus, setExpandStatus] = useState<string[]>(['none', '20px']);
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');
  const [isSet, setIsSet] = useState<boolean>(false);
  const [department, setDepartment] = useState<Department>();

  //const [selectedDepartment, setSelectedDepartment] = useState<number>(props.departmentId);

  //Expand/collapse component to show more/less information on click
  const expandCollapse = async () => {
    //lag en state for true/false for om du har lasta inn data før
    if (expandStatus[0] == 'none') {
      setExpandStatus(['block', '20px 20px 0px 0px']);
      setArrowRotation('rotate(180deg)');
    } else {
      setExpandStatus(['none', '20px']);
      setArrowRotation('rotate(0deg)');
    }

    if (!isSet) {
      // så henter man dataen og setter det i states maybe
      setDepartment(await (await getDepartmentById(props.user.departmentId)).data);
      setIsSet(true);
    }

    //console.log("hdhh");
  };

  return (
    <div className="w-[180px]  min-h-[fit-content] text-grey-lightest font-Rubik ">
      <div
        style={{ borderRadius: expandStatus[1] }}
        onClick={() => expandCollapse()}
        className={`${
          props.isCurrentUser ? 'bg-secondary-light' : 'bg-primary-light'
        } flex flex-row justify-between leading-[30px] body-tight`}
      >
        <p className="ml-[20px]">{props.user.firstName + ' ' + props.user.lastName}</p>
        <ExpandMoreIcon
          sx={{
            color: 'white',
            height: '30px',
            mr: '10px',
            transform: arrowRotation
          }}
        ></ExpandMoreIcon>
      </div>
      <section
        style={{ display: expandStatus[0] }}
        className={`${
          props.isCurrentUser ? 'bg-card-two-light' : 'bg-primary-lighter'
        } text-primary subheading-small py-[10px] rounded-b-[20px] overflow-hidden`}
      >
        <p className="mx-[px] text-[18px]">
          Ansatt <strong className="body-bold text-[12px]">{'employ'}</strong>
        </p>
        <p>
          Seksjon <strong className="body-bold text-[12px]">{'section'}</strong>
        </p>
        <p>
          Avdeling <strong className="body-bold text-[12px]">{department?.name}</strong>
        </p>
        <div
          className={`${
            props.isCurrentUser || props.isAdmin ? 'block' : 'hidden'
          } flex flex-row float-right`}
        >
          <EditOutlinedIcon
            onClick={() => {
              console.log('Implement edit user here');
            }}
            sx={{
              color: '#410464',
              height: '30px',
              mr: '10px',
              '&:hover': {
                color: '#26023B'
              }
            }}
          ></EditOutlinedIcon>
        </div>
      </section>
    </div>
  );
}
