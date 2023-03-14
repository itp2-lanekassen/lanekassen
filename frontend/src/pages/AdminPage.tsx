import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import { useGlobalContext } from '../context/GlobalContext';
import { useUserContext } from '../context/UserContext';

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
            navigate('/profil');
          }}
        />
      </div>
    </div>
  );
}
