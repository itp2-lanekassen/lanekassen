import { getAllUsers } from '@/API/UserAPI';
import { User } from '@/types/types';
import { dialogClasses } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PlusButton from './PlusButton';
import SearchBar from './SearchBar';

const addNewUser = () => {
  console.log('hallaballa');
};

const tableHeaders = [
  'Fornavn',
  'Etternavn',
  'E-post',
  'Admin',
  'Ansattforhold',
  'Avdeling',
  'Seksjon',
  'Fagområde',
  'Team',
  'Rolle'
];

export default function UserTab() {
  const [users, setUsers] = useState<User[]>();

  async function loadUsers() {
    setUsers((await getAllUsers()).data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  //console.log(users);

  return (
    <div>
      <PlusButton handleClick={addNewUser} />
      <SearchBar />

      <table>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </table>
    </div>
  );
}

// en tr for hver bruker
// flere td for hver tr
