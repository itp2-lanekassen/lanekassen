import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import { useUserContext } from '../context/UserContext';
import ellipse from '../assets/ellipse.png';
import AdminTabs from '../components/AdminTabs';

/**
 *
 * @returns component that is the admin page for editing and deleting users and other admin stuff
 */
export default function AdminPage() {
  const navigate = useNavigate();
  const currentUser = useUserContext();

  useEffect(() => {
    if (!currentUser.admin) {
      // midlertidig løsning for å beskytte siden mot ikke admins
      navigate('/');
    }
  }, [currentUser.admin, navigate]);

  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="md:w-[70vw] mobile:w-[90vw] md:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Adminfunksjonalitet</h1>
      </div>
      <div className="absolute top-16 left-10 flex justify-end">
        <SubmitButton
          disabled={false}
          disabledTitle={'minside'}
          buttonText={'Til min side'}
          handleClick={() => {
            navigate('/profil');
          }}
        />
      </div>

      <AdminTabs />
    </div>
  );
}
