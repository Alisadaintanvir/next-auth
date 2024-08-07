import SignUpForm from "@/components/SignUpForm";
function page() {
  return (
    <div className="flex flex-col h-screen justify-center items-center  ">
      <div className="border-2 p-8 rounded-md space-y-14 w-1/3">
        <h1 className="text-3xl font-bold">Register</h1>

        <SignUpForm />
      </div>
    </div>
  );
}

export default page;
