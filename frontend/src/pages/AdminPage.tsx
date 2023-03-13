import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getRolesByDepartmentId,
  getSectionsByDepartmentId,
  getSubjectFieldsByDepartmentId,
  getTeamsByDepartmentId
} from '../API/DepartmentAPI';
import { updateUser, deleteUser } from '../API/UserAPI';
import ellipse from '../assets/ellipse.png';
import Dropdown from '../components/Dropdown';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';
import { EmploymentType, Role, SubjectField, Team } from '../types/types';
import { SignOutButton } from '../components/SignOutButton';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @returns component that is the admin page for editing and deleting users and other admin stuff
 */
export default function AdminPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentUser = useUserContext();
  const { departments } = useGlobalContext();

  useEffect(() => {
    if (!currentUser.admin) {
      // midlertidig løsning for å beskytte siden
      navigate('/');
    }
  }, [currentUser.admin, navigate]);

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="absolute top-18 left-10 flex justify-end">
        <SubmitButton
          disabled={false}
          disabledTitle={'minside'}
          buttonText={'Til min side'}
          handleClick={() => {
            navigate('/mypage');
          }}
        />
      </div>
    </div>
  );
}
