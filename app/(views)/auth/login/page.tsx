import { Metadata } from "next";
import { LoginForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default async () => {
  return (
    <div className="relative w-[22rem] p-8 text-center border border-black dark:border-white/50 rounded-lg backdrop-blur-lg">
      <LoginForm />
    </div>
  );
};
