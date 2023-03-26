import { ReactNode } from 'react';
import ellipse from '../assets/ellipse.png';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto">
      <div className="flex justify-center relative h-1/4-screen">
        <img className="w-9/12 h-1/5-screen" src={ellipse} alt="" />
        <h1 className="absolute top-1/3 -translate-y-1/3">{title}</h1>
      </div>
      {children}
    </main>
  );
};

export default PageLayout;
