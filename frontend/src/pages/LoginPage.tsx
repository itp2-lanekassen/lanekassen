import logo from '@/assets/lanekassen_logo.png';
import { SignInButton } from '@/components/SignInButton';

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-6">
      <img src={logo} alt="Logo" className="w-8/12" />
      <SignInButton />
    </div>
  );
};

export default LoginPage;
