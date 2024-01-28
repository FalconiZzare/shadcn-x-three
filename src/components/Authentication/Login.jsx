import UserAuthForm from "@/components/Authentication/UserAuthForm.jsx";

const Login = () => {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In Portal</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below to sign in</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
};

export default Login;
