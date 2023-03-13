import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { updateUser, deleteUser } from '../API/UserAPI';
import ellipse from '../assets/ellipse.png';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { EmploymentType, Role, SubjectField, Team } from '../types/types';
import { SignOutButton } from '../components/SignOutButton';
import { useNavigate } from 'react-router-dom';
import {
  getAllAbsenceTypes,
  postAbsenceType,
  updateAbsenceType,
  deleteAbsenceType
} from '../API/AbsenceTypeAPI';

/**
 *
 * @returns component that is the admin page for editing and deleting users and other admin stuff
 */
export default function AdminPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentUser = useUserContext();

  const [alternative, setAlternative] = useState<string[]>(['Avdeling']);
  const [selectedAlternative, setSelectedAlternative] = useState<number>(-1);

  const [selectedAbsenceType, setSelectedAbsenceType] = useState<number>(-1);
  const [selectedAbsenceTypeName, setSelectedAbsenceTypeName] = useState<string>('');
  const [selectedAbsenceTypeCode, setSelectedAbsenceTypeCode] = useState<string>('');
  const [selectedAbsenceTypeColorCode, setSelectedAbsenceTypeColorCode] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false); //endres til true seinere
  const [crud, setCrud] = useState<string[]>(['Opprett']);
  const [selectedCrud, setSelectedCrud] = useState<number>(-1);

  const [isValuesChosen, setIsValuesChosen] = useState(false);

  // map department, section, subjectfields, teams, roles, user, absenceType to alternativ

  // create array of CRUD operations and alternative options
  const crudOptions = ['Opprett', 'Oppdater', 'Slett'];
  const alternativeOptions = [
    'Fravær',
    'FraværsType',
    'Bruker',
    'Avdeling',
    'Seksjon',
    'Fagfelt',
    'Team',
    'Rolle'
  ];

  //map to crud-hook
  function mapping() {
    const crud2 = crudOptions.map((crud3) => crud3);
    setCrud(crud2);
    const alternative2 = alternativeOptions.map((alternative3) => alternative3);
    setAlternative(alternative2);
  }

  useEffect(() => {
    mapping();
  }, []);

  // Hide button if no alternative is chosen
  useEffect(() => {
    if (selectedAlternative === -1 || selectedCrud === -1) {
      setIsValuesChosen(false);
    } else {
      setIsValuesChosen(true);
    }
  }, [selectedAlternative, selectedCrud]);

  function createAbsenceType() {
    postAbsenceType({
      name: selectedAbsenceTypeName,
      code: selectedAbsenceTypeCode,
      colorCode: selectedAbsenceTypeColorCode
    });
  }

  useEffect(() => {
    if (!currentUser.admin) {
      // midlertidig løsning for å beskytte siden
      navigate('/');
    }
  }, [currentUser.admin, navigate]);

  const { data: absenceTypes } = useQuery(['absenceTypes'], getAllAbsenceTypes);

  const handleClick = () => {
    console.log('hei');
  };

  return (
    <div>
      <div className="grid mx-auto w-max gap-4 place-items-center mt-16">
        <h1>Admin side</h1>
      </div>
      <div className="absolute top-18 left-10 flex justify-end">
        <SubmitButton
          disabled={false}
          disabledTitle={'minside'}
          buttonText={'Til min side'}
          handleClick={() => {
            navigate('/mypage');
          }}
        />
      </div>

      <div className="grid mx-auto w-max gap-4 place-items-center mt-16">
        <p>Velg CRUD-operasjon:</p>
        <Dropdown
          placeholder={'Velg CRUD-operasjon'}
          listOfOptions={crud.map((type, i) => ({ name: type, id: i }))}
          handleChange={(e) => setSelectedCrud(e)}
          value={selectedCrud}
          isDisabled={false}
        />
      </div>

      <div className="grid mx-auto w-max gap-4 place-items-center mt-16">
        <p>Velg hva du vil endre på:</p>
        <Dropdown
          placeholder={'Velg alternativ'}
          listOfOptions={alternative.map((type, i) => ({ name: type, id: i }))}
          handleChange={(e) => setSelectedAlternative(e)}
          value={selectedAlternative}
          isDisabled={false}
        />
      </div>

      <div className="grid mx-auto w-max gap-4 place-items-center mt-16"></div>

      {isValuesChosen ? (
        <div className="grid mx-auto w-max gap-4 place-items-center mt-16">
          <SubmitButton
            buttonText={`${crud[selectedCrud]} ${alternativeOptions[selectedAlternative]}`}
            handleClick={handleClick}
            disabled={isDisabled}
            disabledTitle={'Fyll ut ansattforhold, avdeling, seksjon og fagområde'}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
