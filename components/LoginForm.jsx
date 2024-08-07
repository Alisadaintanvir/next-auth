"use client";

import { useFormState } from "react-dom";
import FormSubmit from "./FormSubmit";
import { loginAction } from "@/lib/action";
function LoginForm() {
  const [formState, formAction] = useFormState(loginAction, {});
  return (
    <form action={formAction} className="space-y-5">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="username"
          className="border border-gray-300 rounded-lg p-2 text-gray-700"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          className="border border-gray-300 rounded-lg p-2 text-gray-700"
        />
      </div>

      {/* {formState.errors && (
        <ul>
          {Object.keys(formState.errors).map((error) => (
            <li key={error} className="text-sm text-red-500">
              {formState.errors[error]}
            </li>
          ))}
        </ul>
      )} */}

      <FormSubmit text="Login" />
    </form>
  );
}

export default LoginForm;
