import { useGlobalContext } from '@/context/GlobalContext';
import { SingleCalendarCellDisplay } from '../SingleCalendarCellDisplay';
import { useState } from 'react';
import { QuestionMark } from '@mui/icons-material';

interface FilterDescriptionProps {
  className?: string;
}

const FilterDescription = ({ className }: FilterDescriptionProps) => {
  const { absenceTypes } = useGlobalContext();
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={className}>
      <button
        className="border-1 rounded-full border-primary text-center focus:outline-none p-2 flex items-center text-primary-contrast bg-primary hover:bg-white hover:text-primary"
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        <QuestionMark fontSize="inherit" />
      </button>
      {showDescription && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card-one-light z-50 px-4 py-2 rounded-lg text-primary border-primary border-2"
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        >
          <h2 className="text-xl mb-6 text-primary">Forklaring av farger og koder</h2>
          <div className="flex flex-col">
            {absenceTypes.map((type) => (
              <div
                key={type.absenceTypeId}
                className="w-100 inline-flex justify-start items-center md:heading-2xs text-xs"
              >
                <div className="mb-2 pr-2">
                  <SingleCalendarCellDisplay code={type.code} colorCode={type.colorCode} />
                </div>
                <span className="overflow-hidden text-ellipsis text-primary whitespace-nowrap pb-1">
                  {type.name}
                </span>
              </div>
            ))}
          </div>
          <p>Skravert rute betyr at fraværet ikke er godkjent enda</p>
        </div>
      )}
    </div>
  );
};

export default FilterDescription;
