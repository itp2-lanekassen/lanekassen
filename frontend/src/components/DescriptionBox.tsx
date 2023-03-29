import { useState } from 'react';
import classNames from 'classnames';

const InfoPane = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleHover = () => {
    setIsHovering(!isHovering);
  };

  const infoPaneClasses = classNames(
    'fixed',
    'bottom-0',
    'right-0',
    'p-4',
    'bg-gray-800',
    'text-white',
    'cursor-pointer',
    {
      'hover:bg-gray-700': !isHovering,
      'bg-gray-700': isHovering
    }
  );

  const paneContentClasses = classNames(
    'fixed',
    'inset-0',
    'flex',
    'items-center',
    'justify-center',
    'bg-gray-900',
    'bg-opacity-75',
    'transition-opacity',
    {
      'opacity-0 pointer-events-none': !isHovering,
      'opacity-100 pointer-events-auto': isHovering
    }
  );

  return (
    <div>
      <div className={infoPaneClasses} onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <span className="text-xl">i</span>
      </div>
      <div className={paneContentClasses}>
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Information Pane</h2>
          <p className="text-gray-700">
            This is some information about the thing you clicked on. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPane;
