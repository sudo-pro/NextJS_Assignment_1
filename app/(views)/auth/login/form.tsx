"use client";

import Link from "next/link";
import { HOMEPAGE } from "~/lib/constants";
import { login } from "~/app/actions/auth/login";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { ReactButton } from "~/components/ReactButton";
import { signIn } from "next-auth/react";
import { useFormAction } from "~/lib/hooks/useFormAction";

export function LoginForm() {
  const [state, action] = useFormAction(login);

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
      <h1 className="text-4xl font-bold mb-5 text-black dark:text-lime-500">
        Login
      </h1>
      <div className="relative border-b-2">
        <input
          id="email"
          type="text"
          name="email"
          autoComplete="off"
          required
          className="w-full h-10 bg-transparent border-none outline-none text-base peer"
        />
        <label
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-base pointer-events-none transition-all 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base 
              peer-focus:top-0 peer-focus:text-xs peer-focus:-translate-y-full 
              peer-valid:top-0 peer-valid:text-xs peer-valid:-translate-y-full"
        >
          Enter your email
        </label>
      </div>
      {state?.errors?.email && (
        <p className="text-sm text-red-800">{state.errors.email}</p>
      )}
      <div className="relative border-b-2 border-gray-300 mt-6">
        <input
          type={"password"}
          id="password"
          name="password"
          autoComplete="off"
          required
          className="w-full h-10 bg-transparent border-none outline-none text-base peer"
        />
        <label
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-base pointer-events-none transition-all 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base 
              peer-focus:top-0 peer-focus:text-xs peer-focus:-translate-y-full 
              peer-valid:top-0 peer-valid:text-xs peer-valid:-translate-y-full"
        >
          Enter your password
        </label>
      </div>
      {state?.errors?.password && (
        <p className="text-sm text-red-800">{state.errors.password}</p>
      )}
      <ReactButton
        onStatic="Login"
        onAction="Loging..."
        className="mt-4 bg-black text-white font-semibold py-3 px-5 rounded-lg hover:bg-lime-400 transition-all hover:text-black"
      />

      <div className="mt-1">
        <p>
          {`Don't have an account!`}
          <Link
            href="/auth/signup"
            className="border-x border-blue-600 rounded-full px-2 underline underline-offset-2 hover:bg-yellow-400 transition-all"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
