import { ReactNode } from 'react';
import ellipse from '@/assets/ellipse.png';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center">
        <img
          className="sm:w-[70vw] mobile:w-[90vw] sm:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="-mt-[100px] mb-16">{title}</h1>
      </div>
      {children}
    </main>
  );
};

export default PageLayout;
