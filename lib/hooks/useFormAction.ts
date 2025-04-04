"use client";

import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { toast } from "sonner";

export function useFormAction<State extends FormState>(
  formAction: (state: Awaited<State>, formData: FormData) => Promise<State>,
  editMode?: Dispatch<SetStateAction<boolean>>,
  isRedirect: boolean = true,
): [state: Awaited<State>, dispatch: () => void, next: string] {
  const [state, action] = useActionState(
    formAction as (state: Awaited<State>) => State | Promise<State>,
    undefined as Awaited<State>,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      state.success = null;
      if (isRedirect && state?.redirectTo) {
        redirect(state.redirectTo);
      }
      if (editMode) {
        editMode(false);
      }
    } else if (state?.message) {
      toast.info(state.message);
      state.message = null;
    } else if (state?.error) {
      toast.error(state.error);
      state.error = null;
    }
  }, [state]);

  return [state, action, state?.redirectTo || ""] as [
    Awaited<State>,
    () => void,
    string,
  ];
}
