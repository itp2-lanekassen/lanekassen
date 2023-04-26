import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

interface CustomMultiDropdownProps<T> {
  placeholder: string;
  value: T[];
  options: { value: T; label: string }[];
  onChange: (val: T[]) => void;
}

const CustomMultiDropdown = <T extends number | string>({
  placeholder,
  options,
  value,
  onChange
}: CustomMultiDropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  const wrapper = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', clickHandler);
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('mousedown', clickHandler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  const toggleSelected = (val: T, add: boolean) => {
    if (add) {
      return onChange([...value, val]);
    }

    onChange(value.filter((v) => v !== val));
  };

  return (
    <div ref={wrapper} className="relative text-primary-light text-sm lg:text-base">
      <div
        role="button"
        tabIndex={0}
        className={classNames(
          open ? 'outline-1' : 'outline-0',
          'py-1.5 pl-3 pr-2 flex gap-2 justify-between items-center rounded-full',
          'border-1 border-primary-light focus:outline-1 outline outline-primary-light'
        )}
        onKeyDown={(e) => e.key.match(/Enter| /) && setOpen(!open)}
        onClick={() => setOpen(!open)}
      >
        {placeholder}
        <span className="pl-1 border-r-primary-light border-l-[0.5px]">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </span>
      </div>

      <div
        className={classNames(
          open ? 'block' : 'hidden',
          'absolute bg-grey-lightest z-50 mt-2 overflow-hidden',
          'rounded-2xl drop-shadow-2xl',
          'w-full min-w-max'
        )}
      >
        <ul className="max-h-64 overflow-y-auto overflow-x-hidden">
          {options.map((option) => (
            <li key={option.value}>
              <label
                htmlFor={option.label.replace(/\s/g, '')}
                className={classNames(
                  value.includes(option.value) ? 'bg-primary-lighter' : 'bg-grey-lightest',
                  'flex gap-2 py-2 px-3 cursor-pointer check',
                  'hover:bg-primary-lighter whitespace-nowrap'
                )}
              >
                <input
                  type="checkbox"
                  className="accent-primary-light"
                  id={option.label.replace(/\s/g, '')}
                  checked={value.includes(option.value)}
                  onChange={(e) => toggleSelected(option.value, e.target.checked)}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomMultiDropdown;
