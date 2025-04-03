import { useFormStatus } from "react-dom";

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="mt-4 dark:bg-white dark:text-black hover:text-black font-semibold py-3 px-5 rounded-lg hover:bg-teal-400 transition-all dark:hover:bg-teal-400"
    >
      {pending ? "Submitting..." : "Sign up"}
    </button>
  );
}
