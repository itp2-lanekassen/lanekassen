import { getAllAbsenceTypes } from '@/API/AbsenceTypeAPI';
import AbsenceForm from '@/components/AbsenceForm';
import { AbsenceType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useState } from 'react';

interface GlobalContextProps {
  children?: ReactNode;
}

// TODO: add stuff like section setc here as well
interface GlobalContextType {
  openAbsenceForm: (date?: string) => void;
  absenceTypes: AbsenceType[];
}

const GlobalContext = createContext<GlobalContextType>({
  openAbsenceForm: () => null,
  absenceTypes: []
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  const absenceTypes = useQuery(['absence-types'], async () => (await getAllAbsenceTypes()).data);

  const [showAbsenceForm, setShowAbsenceForm] = useState(false);
  const [date, setDate] = useState<string>();

  const openAbsenceForm = (clickedDate?: string) => {
    setDate(clickedDate);
    setShowAbsenceForm(true);
  };

  if (absenceTypes.isLoading) return <div>Loading...</div>;

  if (absenceTypes.isError) return <div>Error :/</div>;

  return (
    <GlobalContext.Provider
      value={{
        openAbsenceForm,
        absenceTypes: absenceTypes.data
      }}
    >
      {children}
      {showAbsenceForm && (
        <AbsenceForm startDate={date} onClose={() => setShowAbsenceForm(false)} />
      )}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
