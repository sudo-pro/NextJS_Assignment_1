import { Metadata } from "next";
import { SignupForm } from "./form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async () => {
  return (
    <div className="relative w-[22rem] p-8 text-center border border-black dark:border-white/50 rounded-lg backdrop-blur-lg">
      <SignupForm />
    </div>
  );
};
