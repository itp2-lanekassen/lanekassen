export const CalendarCellDisplay = ({ code, colorCode }: { code: string; colorCode: string }) => {
  //hatch pattern
  const style = {
    backgroundImage: `repeating-linear-gradient(
          135deg,
          ${colorCode}, 
          ${colorCode} 4px,
          #000000 3px,
          #000000 8px
        )`
  };

  const style2 = {
    backgroundColor: colorCode
  };

  return (
    <span className="flex items-center justify-center">
      <span
        className="w-full min-h-[21px] max-h-[21px] max-w-[60px] min-w-[60px] ml-2"
        style={style2}
      >
        <span className="inset-0 flex items-center justify-center text-sm text-primary-contrast px-1 font-bold">
          {code}
        </span>
      </span>

      <span
        className="w-full min-h-[21px] max-h-[21px] min-w-[60px] max-w-[60px] ml-2"
        style={style}
      >
        <span className="inset-0 flex items-center justify-center text-sm text-primary-contrast px-1 font-bold">
          {code}
        </span>
      </span>
    </span>
  );
};
