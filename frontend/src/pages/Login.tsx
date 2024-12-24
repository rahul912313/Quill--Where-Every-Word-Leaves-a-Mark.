import LoginForm from '../../components/LoginForm';
import QuoteCard from '../../components/QuoteCard';

const Login = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex justify-center items-center bg-white">
        <LoginForm />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <QuoteCard />
      </div>
    </div>
  );
};

export default Login;
