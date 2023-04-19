import { getAllUsers } from '@/API/UserAPI';
import { User } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';

const tableHeaders = ['Fornavn', 'Etternavn', 'E-post', 'Ansattforhold', 'Avdeling', 'Seksjon', ''];
const tableHeadersSmall = ['Fornavn', 'Etternavn', 'Avdeling', ''];

export default function UserView() {
  const [matchingUsers, setMatchingUsers] = useState<User[]>();
  const [view, setView] = useState<JSX.Element>(<></>);

  const { data: users } = useQuery(['users'], async () => (await getAllUsers()).data);

  // Add matching users to new list to avoid having to load data again
  // when the query changes
  const searchForUsers = (event: any) => {
    const matches: User[] = [];
    users?.forEach((user) => {
      if (
        user.firstName.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
        user.lastName.toLowerCase().startsWith(event.target.value.toLowerCase())
      ) {
        matches.push(user);
      }
    });
    setMatchingUsers(matches);
  };

  // Set list of matching users again every time users are loaded
  useEffect(() => {
    setMatchingUsers(users);
  }, [users]);

  // Set view when matching users is set, so that the list of users to be displayed isn't empty
  useEffect(() => {
    setView(defaultView);
  }, [matchingUsers]);

  const defaultView = (
    <div>
      <div className="flex justify-center">
        <input
          className="mt-3 flex modal-input w-4/12 border-2 rounded-[20px] p-2 border-primary bg-primary-contrast"
          type="text"
          placeholder="Søk"
          onChange={searchForUsers}
        ></input>
      </div>
      <div className=" mt-5 flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <div className="grid-cols-users-small md:grid-cols-users grid col-span-3 md:col-span-6 w-full place-item-center text-center gap-x-2 gap-y-3">
            {tableHeadersSmall.map((header) => (
              <p key={header} className={`ml-4 flex-1 font-bold mb-2 mr-10 md:hidden`}>
                {header}
              </p>
            ))}
            {tableHeaders.map((header) => (
              <p key={header} className={`ml-4 flex-1 font-bold mb-2 mr-10 hidden md:block`}>
                {header}
              </p>
            ))}
            <div className="col-span-5 md:col-span-8 border-b-2 w-full" />
            {matchingUsers?.map((user) => (
              <UserRow key={user.azureId} user={user} setView={setView} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return view;
}
