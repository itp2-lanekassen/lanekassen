import AbsenceForm from '../components/AbsenceForm';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Absence } from '../types/types';

interface ModalContextType {
  openAbsenceForm: (date?: string, type?: string, absence?: Absence) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error('ModalContext must be used within its provider');

  return ctx;
};

const ModalContextProvider = ({ children }: { children?: ReactNode }) => {
  const [showAbsenceForm, setShowAbsenceForm] = useState(false);
  const [date, setDate] = useState<Date>();
  const [type, setType] = useState<string>();
  const [clickedAbsence, setClickedAbsence] = useState<Absence>();

  const openAbsenceForm = (clickedDate?: string, formType?: string, absence?: Absence) => {
    if (clickedDate) {
      setDate(new Date(clickedDate));
    } else {
      setDate(undefined);
    }
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
          type={type}
          clickedAbsence={clickedAbsence}
          onClose={() => setShowAbsenceForm(false)}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
