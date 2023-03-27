import { getAllUsers, getUserById } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import UserRow from './UserRow';
import UserTabSelectedContent from './UserTabSelectedContent';

const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon'];

export default function UserTab() {
  const [users, setUsers] = useState<User[]>();
  const [clickedUserId, setClickedUserId] = useState<number>(-1);
  const [selectedUser, setSelectedUser] = useState<User>();

  async function loadUsers() {
    setUsers((await getAllUsers()).data);
  }

  async function getSelectedUser() {
    console.log(clickedUserId);
    setSelectedUser((await getUserById(clickedUserId)).data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (clickedUserId > -1) {
      getSelectedUser();
    }
  }, [clickedUserId]);

  if (selectedUser) {
    return <UserTabSelectedContent selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
  } else {
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
}

/**
 * Må gjøres:
 * fikse at add-knappen fungerer (route, add skjema, add tilbakeknapp)
 * plassere komponenter riktig
 * adde søkefunksjonalitet til søkefeltet
 * kunne klikke på en ansatt og åpne skjema for å redigere (med rett info)
 */

/**
 * Current problems:
 * den kommer bare til å rendre 1 gang, så det if else funker nok ikke
 * den setter states med en gang, så selectedUser er null
 */

/**
 * løsning på at ting er null? lage egne komponenter for ulike "pages",
 * på den måten kan du kjøre state-greiene kun når selectedUser ikke er null
 */
