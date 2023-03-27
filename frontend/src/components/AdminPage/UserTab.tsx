import { getAllUsers, getUserById } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';
import UserTabSelectedContent from './UserTabSelectedContent';

const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon'];

export default function UserTab() {
  const [users, setUsers] = useState<User[]>();
  const [matchingUsers, setMatchingUsers] = useState<User[]>();
  const [clickedUserId, setClickedUserId] = useState<number>(-1);
  const [selectedUser, setSelectedUser] = useState<User>();

  async function loadUsers() {
    setUsers((await getAllUsers()).data);
    setMatchingUsers((await getAllUsers()).data);
  }

  async function getSelectedUser() {
    setSelectedUser((await getUserById(clickedUserId)).data);
  }

  const searchForUsers = (event: any) => {
    const matches: User[] = [];
    users?.forEach((user) => {
      if (user.firstName.toLowerCase().startsWith(event.target.value)) {
        matches.push(user);
      }
    });
    /**
     * hver gang man trykker på en tast i search bar vil man kjøre searchFunction
     * man vil hente ut hva som står i search bar og bruke dette som keyword
     * hvis baren er tom skal alle brukere vises
     * fikse event:any til riktig type
     *
     * den ligger ett steg bak
     */
    setMatchingUsers(matches);
    console.log(matches);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (clickedUserId > -1) {
      getSelectedUser();
    }
  }, [clickedUserId]);

  if (selectedUser) {
    return (
      <UserTabSelectedContent
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setClickedUserId={setClickedUserId}
        setUsers={setUsers}
      />
    );
  } else {
    return (
      <div>
        <div className="flex">
          <input
            className="flex modal-input w-4/12 border-2 rounded-[20px] p-2 border-primary"
            type="text"
            placeholder="Søk"
            onKeyDown={searchForUsers}
          ></input>
        </div>
        <table className="ml-10">
          <tbody>
            <tr>
              {tableHeaders.map((header) => (
                <th className="p-3 pr-5" key={header}>
                  {header}
                </th>
              ))}
            </tr>
            {matchingUsers?.map((user) => (
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
 * plassere komponenter riktig
 * adde søkefunksjonalitet til søkefeltet
 * fikse roles/team/subject field
 * må kunne gi adminrettigheter
 */
