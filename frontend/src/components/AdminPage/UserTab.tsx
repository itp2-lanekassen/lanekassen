import { getAllUsers } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useEffect, useState } from 'react';
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
  'Seksjon'
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
            <th className="p-3" key={header}>
              {header}
            </th>
          ))}
        </tr>
        {users?.map((user) => (
          <UserRow key={user.azureId} user={user} />
        ))}
      </table>
    </div>
  );
}

/**
 * Må gjøres:
 * fikse at add-knappen fungerer (route, add skjema, add tilbakeknapp)
 * formattere navn
 * legge til mange brukere og se om panelet utvikler seg
 * plassere komponenter riktig
 * adde søkefunksjonalitet til søkefeltet
 * kunne klikke på en ansatt og åpne skjema for å redigere (med rett info)
 */
