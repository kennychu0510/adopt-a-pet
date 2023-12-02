import { SetStateAction } from "react";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import ToastifyConfig from "./toastify";

export function handleFetchError({
  error,
  setErrors,
}: {
  error: unknown;
  setErrors: (value: SetStateAction<Set<string>>) => void;
}) {
  if (error instanceof ZodError) {
    setErrors(new Set(Object.keys(error.formErrors.fieldErrors)));
    toast.error("Please check your form!", ToastifyConfig);
  } else if (error instanceof ServerError) {
    toast.error("Server is not available!", ToastifyConfig);
  }
  console.log(error);
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}
