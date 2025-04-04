"use client";

import Link from "next/link";
import React from "react";

export const WelcomeMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl md:text-5xl font-bold text-black mb-8 animate-slide-in">
        Welcome{" "}
        <Link
          href={"https://github.com/jay-neo"}
          className="text-amber-500 hover:text-amber-700"
        >
          jay-neo's
        </Link>{" "}
        Task Tracker
      </h1>

      <Link
        href={"/dashboard"}
        className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg 
                  transition-all duration-300 ease-in-out
                  hover:bg-gray-800 hover:scale-105 hover:shadow-lg
                  active:scale-95"
      >
        Get Started
      </Link>
    </div>
  );
};

const styles = `
  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in {
    animation: slideIn 1s ease-out forwards;
  }
`;
