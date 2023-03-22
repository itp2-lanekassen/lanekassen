import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { getAllUsers } from '@/API/UserAPI';
import { Department, EmploymentType, Role, Section, SubjectField, Team, User } from '@/types/types';
import { dialogClasses } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PlusButton from './PlusButton';
import SearchBar from './SearchBar';
import UserRow from './UserRow';

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

  console.log(users);

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
        {users?.map((user) => (
          <UserRow key={user.azureId} user={user} />
        ))}
      </table>
    </div>
  );
}

// må loade med en gang, ikke en knapp
// må gjøres for hver user
// tror ikke du kan overskrive state, blir muligens buggy, så du kan ikke ha globale states
// kanskje du kan gjøre det inni map-funksjonen?

/**
 * Ideer:
 * Sette states inni map-funksjonen. Problem: map-funksjonen kan ikke være async
 * Kalle funksjon som er async inni map. useEffect? Problem: hvordan hente ut states. kan returnere et user-objekt?
 * Lage en egen komponent for hver rad, deale med det derfra
 */
