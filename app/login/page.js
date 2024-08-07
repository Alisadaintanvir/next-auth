import FormSubmit from "@/components/FormSubmit";
import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center  ">
      <div className="border-2 p-8 rounded-md space-y-14 w-1/3">
        <h1 className="text-3xl font-bold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
