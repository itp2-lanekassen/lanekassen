import { getAllUsers } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';
const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon', ''];

export default function UserView() {
  const [matchingUsers, setMatchingUsers] = useState<User[]>();
  const [view, setView] = useState<JSX.Element>(<></>);

  const { data: users } = useQuery(['users'], async () => (await getAllUsers()).data);

  // Add matching users to new list to avoid having to load data again
  // when the query changes
  const searchForUsers = (event: any) => {
    const matches: User[] = [];
    users?.forEach((user) => {
      if (user.firstName.toLowerCase().startsWith(event.target.value)) {
        matches.push(user);
      }
    });
    setMatchingUsers(matches);
  };

  useEffect(() => {
    setMatchingUsers(users);
  }, [users]);

  useEffect(() => {
    setView(defaultView);
  }, [matchingUsers]);

  const defaultView = (
    <div>
      <div className="flex justify-center">
        <input
          className="flex modal-input w-4/12 border-2 rounded-[20px] p-2 border-primary"
          type="text"
          placeholder="Søk"
          onChange={searchForUsers}
        ></input>
      </div>
      <table className="ml-10">
        <tbody>
          <tr className="border-b-2">
            {tableHeaders.map((header) => (
              <th className="p-3 pr-5" key={header}>
                {header}
              </th>
            ))}
          </tr>
          {matchingUsers?.map((user) => (
            <UserRow key={user.azureId} user={user} setView={setView} />
          ))}
        </tbody>
      </table>
    </div>
  );

  return view;
}
