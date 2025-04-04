type FormState =
  | {
      success?: string | null;
      error?: string | null;
      message?: string | null;
      redirectTo?: string | null;
    }
  | undefined;
