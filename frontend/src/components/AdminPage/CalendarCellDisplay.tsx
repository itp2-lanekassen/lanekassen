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
    <div className="items-center justify-center">
      <div className=" grid grid-cols-2 justify-center items-center mt-1">
        <div
          className="w-full min-h-[21px] max-h-[21px] h-full max-w-[60px] min-w-[60px] ml-2"
          style={style2}
        >
          <span className="inset-0 flex items-center justify-center text-sm text-white px-1 font-bold">
            {code}
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-2 justify-center items-center mt-1">
        <div
          className="w-full min-h-[21px] max-h-[21px] min-w-[60px] max-w-[60px] ml-2"
          style={style}
        >
          <span className="inset-0 flex items-center justify-center text-sm text-white px-1 font-bold">
            {code}
          </span>
        </div>
      </div>
    </div>
  );
};

/* <p className="inset-0 flex items-center justify-center">Godkjent fravær: </p> */
/* <p className="inset-0 flex items-center justify-center">Ikke-godkjent fravær: </p> */
