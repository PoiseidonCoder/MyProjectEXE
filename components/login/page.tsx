import Link from "next/link";
import { LoginForm } from "./login-form";
const LoginPage = () => {
  return (
    <div className="w-[492px] py-2 px-3 mr-5">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-[35px]">Welcome Back!</h1>
        <Link
          href="/signup"
          className="border-[#303033] border-b-[1px] text-sm"
        >
          New User ? Sign Up Here
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
