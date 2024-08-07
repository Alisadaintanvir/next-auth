"use client";

import FormSubmit from "./FormSubmit";
import { signUp } from "@/lib/action";
import { useFormState } from "react-dom";

function SignUpForm() {
  const [formState, formAction] = useFormState(signUp, {});

  return (
    <form action={formAction} className="space-y-5">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="username"
          placeholder="email"
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

      {formState.errors && (
        <ul>
          {Object.keys(formState.errors).map((error) => (
            <li key={error} className="text-red-500">
              {formState.errors[error]}
            </li>
          ))}
        </ul>
      )}

      <FormSubmit text="Register" />
    </form>
  );
}

export default SignUpForm;
