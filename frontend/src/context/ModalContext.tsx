import AbsenceForm from '@/components/AbsenceForm';
import { User } from '@/types/types';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalContextType {
  openAbsenceForm: (user: User, date?: string) => void;
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

  const openAbsenceForm = (clickedUser: User, clickedDate?: string) => {
    setUser(clickedUser);
    setDate(clickedDate);
    setShowAbsenceForm(true);
  };

  return (
    <ModalContext.Provider value={{ openAbsenceForm }}>
      {children}

      {showAbsenceForm && (
        <AbsenceForm startDate={date} user={user} onClose={() => setShowAbsenceForm(false)} />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
