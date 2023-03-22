import { Absence, User } from '@/types/types';
import { createContext, ReactNode, useContext, useState } from 'react';
import AbsenceForm from '../components/AbsenceForm';

interface ModalContextType {
  openAbsenceForm: (user: User, date?: string, type?: string, absence?: Absence) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error('ModalContext must be used within its provider');

  return ctx;
};

const ModalContextProvider = ({ children }: { children?: ReactNode }) => {
  const [showAbsenceForm, setShowAbsenceForm] = useState(false);
  const [date, setDate] = useState<string>();
  const [user, setUser] = useState({} as User);
  const [type, setType] = useState<string>();
  const [clickedAbsence, setClickedAbsence] = useState<Absence>();

  const openAbsenceForm = (
    clickedUser: User,
    clickedDate?: string,
    formType?: string,
    absence?: Absence
  ) => {
    setUser(clickedUser);
    setDate(clickedDate);
    setType(formType);
    setClickedAbsence(absence);
    setShowAbsenceForm(true);
  };

  return (
    <ModalContext.Provider value={{ openAbsenceForm }}>
      {children}

      {showAbsenceForm && (
        <AbsenceForm
          startDate={date}
          user={user}
          type={type}
          clickedAbsence={clickedAbsence}
          onClose={() => setShowAbsenceForm(false)}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
