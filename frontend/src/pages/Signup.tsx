import QuoteCard from "../../components/QuoteCard";
import SignupForm from "../../components/SignupForm";


const Signup = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <QuoteCard />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-white">
        <SignupForm />
      </div>
  </div>
      
  );
};

export default Signup;