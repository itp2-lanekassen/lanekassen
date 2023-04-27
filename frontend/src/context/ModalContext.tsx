import { Absence, User } from '@/types/types';
import { createContext, ReactNode, useContext, useState } from 'react';
import AbsenceForm from '../components/AbsenceForm';
import MessageBox from '@/components/MessageBox';
import ConfirmationBox from '@/components/ConfirmationBox';

interface ModalContextType {
  openAbsenceForm: (user: User, date?: string, type?: string, absence?: Absence) => void;
  openMessageBox: (text?: string) => void;
  openConfirmationBox: (onConfirmAction: () => void, text?: string) => void;
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
  const [user, setUser] = useState({} as User);
  const [type, setType] = useState<string>();
  const [clickedAbsence, setClickedAbsence] = useState<Absence>();

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');

  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [confirmAction, setConfirmAction] = useState<() => void>(() => null);

  const openAbsenceForm = (
    clickedUser: User,
    clickedDate?: string,
    formType?: string,
    absence?: Absence
  ) => {
    setUser(clickedUser);
    if (clickedDate) {
      setDate(new Date(clickedDate));
    } else {
      setDate(undefined);
    }
    setType(formType);
    setClickedAbsence(absence);
    setShowAbsenceForm(true);
  };

  const openMessageBox = (text = '') => {
    setErrorMessageText(text);
    setShowMessageBox(true);
  };

  const openConfirmationBox = (onConfirmAction: () => void, text = '') => {
    setConfirmText(text);
    setShowConfirmationBox(true);
    setConfirmAction(() => onConfirmAction);
  };

  return (
    <ModalContext.Provider value={{ openAbsenceForm, openConfirmationBox, openMessageBox }}>
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

      {showMessageBox && (
        <MessageBox
          confirmationText={errorMessageText}
          isOpen={showMessageBox}
          onConfirm={() => setShowMessageBox(false)}
          onClose={() => setShowMessageBox(false)}
        />
      )}

      {showConfirmationBox && (
        <ConfirmationBox
          confirmationText={confirmText}
          isOpen={showConfirmationBox}
          onConfirm={() => {
            confirmAction();
            setShowConfirmationBox(false);
          }}
          onClose={() => setShowConfirmationBox(false)}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
