"use client";

import clsx from "clsx";
import Link from "next/link";
import { HOMEPAGE } from "~/lib/constants";
import { signup } from "~/app/actions/auth/signup";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useFormAction } from "~/lib/hooks/useFormAction";
import { ReactButton } from "~/components/ReactButton";

const inputField = `absolute left-0 top-1/2 transform -translate-y-1/2 text-base pointer-events-none transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:-translate-y-full peer-valid:top-0 peer-valid:text-xs peer-valid:-translate-y-full`;

export function SignupForm() {
  const [state, action] = useFormAction(signup);

  useEffect(() => {
    const signInUser = async () => {
      if (state?.user) {
        const { email, password } = state.user;
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        redirect(HOMEPAGE);
      }
    };
    signInUser();
  }, [state?.user]);

  return (
    <form noValidate={true} className="flex flex-col gap-2" action={action}>
      <h1 className="text-3xl font-bold mb-6 dark:text-amber-500">
        Create an account
      </h1>
      <div className="relative border-b-2">
        <input
          id="name"
          type="text"
          name="name"
          autoComplete="off"
          required
          className="w-full h-10 bg-transparent border-none outline-none peer"
        />
        <label className={clsx(inputField)}>Enter your name</label>
      </div>
      {state?.errors?.name && (
        <p className="text-sm text-red-800">{state.errors.name}</p>
      )}
      <div className="relative border-b-2 mt-6">
        <input
          id="email"
          type="text"
          name="email"
          autoComplete="off"
          required
          className="w-full h-10 bg-transparent border-none outline-none text-base peer"
        />
        <label className={clsx(inputField)}>Enter your email</label>
      </div>
      {state?.errors?.email && (
        <p className="text-sm text-red-800">{state.errors.email}</p>
      )}
      <div className="relative border-b-2 border-gray-300 mt-6">
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          required
          className="w-full h-10 bg-transparent border-none outline-none text-base peer"
        />
        <label className={clsx(inputField)}>Enter your password</label>
      </div>
      {state?.errors?.password && (
        <div className="text-sm text-red-800">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <ReactButton
        onStatic={"Sign up"}
        onAction={"Submitting..."}
        className="mt-4  text-white hover:text-black bg-black
      font-semibold py-3 px-5 rounded-lg hover:bg-amber-400 transition-all
      "
      />
      <div className="mt-2">
        <p>
          Already have an account!!{" "}
          <Link
            href="/auth/login"
            className="border-x border-blue-600 rounded-full px-2 py-1  underline underline-offset-2 hover:bg-lime-300 hover:text-black transition-all"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
