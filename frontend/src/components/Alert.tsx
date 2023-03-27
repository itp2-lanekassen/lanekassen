import { Alert } from '@material-tailwind/react';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="text-center display-inline justify-center ">
      <p className="text-error bg-error-contrast border-error border-2 rounded-[20px] inline px-4">
        {message}
      </p>
    </div>
  );
}
