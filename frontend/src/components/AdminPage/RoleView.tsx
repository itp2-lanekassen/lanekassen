// import { useState, useEffect } from 'react';

// interface Role {
//   roleId: number;
//   name: string;
//   users: unknown;
//   departments: unknown;
// }

// function RoleList() {
//   const [names, setNames] = useState<Role[]>([]);

//   useEffect(() => {
//     fetch('https://localhost:7184/Role')
//       .then((response) => response.json())
//       .then((data) => setNames(data));
//   }, []);

//   const namesList = names.map((role) => role.name);

//   return (
//     <div>
//       <ul>
//         {namesList.map((name) => (
//           <li key={name}>{name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RoleList;

import { Role } from '@/types/types';
import { useState } from 'react';
import RoleEdit from './RoleEdit';
import RoleList from './RoleList';

const RoleView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState<Role>();

  const setEdit = (edit: boolean, editRole?: Role) => {
    setIsEditing(edit);
    setRole(editRole);
  };

  if (isEditing) {
    return <RoleEdit role={role} setEdit={setEdit} />;
  }

  return <RoleList setEdit={setEdit} />;
};
export default RoleView;
