"use client";

import { signOut } from "next-auth/react";

// Client side session check for logout button or login button
export default function AuthButton() {
  return (
    <button onClick={() => signOut()} className="bg-rose-500 p-2 rounded-lg">
      Log Out
    </button>
  );
}
