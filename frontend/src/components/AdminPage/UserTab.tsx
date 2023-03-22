import { getAllUsers } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useEffect, useState } from 'react';
import PlusButton from './PlusButton';
import SearchBar from './SearchBar';
import UserRow from './UserRow';

const addNewUser = () => {
  console.log('hallaballa');
};

const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon'];

export default function UserTab() {
  const [users, setUsers] = useState<User[]>();

  async function loadUsers() {
    setUsers((await getAllUsers()).data);
  }

  const openUser = () => {
    console.log('ow');
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <PlusButton handleClick={addNewUser} />
      <SearchBar />

      <table className="ml-10">
        <tbody>
          <tr>
            {tableHeaders.map((header) => (
              <th className="p-3 pr-5" key={header}>
                {header}
              </th>
            ))}
          </tr>
          {users?.map((user) => (
            <UserRow handleClick={openUser} key={user.azureId} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Må gjøres:
 * fikse at add-knappen fungerer (route, add skjema, add tilbakeknapp)
 * plassere komponenter riktig
 * adde søkefunksjonalitet til søkefeltet
 * kunne klikke på en ansatt og åpne skjema for å redigere (med rett info)
 */
