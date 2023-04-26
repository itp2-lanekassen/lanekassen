export const SingleCalendarCellDisplay = ({
  code,
  colorCode
}: {
  code: string;
  colorCode: string;
}) => {
  const style = {
    backgroundColor: colorCode
  };

  return (
    <span className="flex items-center justify-center">
      <span
        className="w-full min-h-[21px] max-h-[21px] h-full max-w-[60px] min-w-[60px] ml-2"
        style={style}
      >
        <span className="inset-0 flex items-center justify-center text-sm text-white px-1 font-bold">
          {code}
        </span>
      </span>
    </span>
  );
};
