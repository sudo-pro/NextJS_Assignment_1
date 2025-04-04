"use server";

import clsx from "clsx";
import AuthButton from "./AuthButton";
import { Pacifico } from "next/font/google";
import Link from "next/link";

const pacifico = Pacifico({ weight: "400" });

export const NavBar = async () => {
  return (
    <header className="flex justify-between py-4 px-6 bg-black text-white rounded-b-4xl shadow-lg">
      <Link
        href={"/"}
        className={clsx("text-2xl font-bold", pacifico.className)}
      >
        Task Tracker
      </Link>
      <AuthButton />
    </header>
  );
};
