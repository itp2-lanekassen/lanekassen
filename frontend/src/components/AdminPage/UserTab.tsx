import { getAllUsers } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import UserRow from './UserRow';

const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon'];

export default function UserTab() {
  const [users, setUsers] = useState<User[]>();
  const [clickedUserId, setClickedUserId] = useState<number>(-1);

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
            <UserRow setClickedUser={setClickedUserId} key={user.azureId} user={user} />
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

/**
 * hvordan henter man ut bruker når man trykker?
 * hvis man lager onclick-funksjonen i UserRow kan du bruke brukeren sin ID :D
 * men hvordan rerendrer man taben?
 * kan man passe inn en state som en variabel og endre den fra UserRow?
 * men hvordan sender man ned setUserIsClicked?
 */

/**
 * plan:
 * 1. sjekke om man kan passe ned en state
 * 2. lage en onclick-funksjon i UserRow
 * 3. ta det derfra
 */

// lag en handlefunksjon i UserRow
//
