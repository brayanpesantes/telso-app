"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    return "Unknown error";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "No se pudo iniciar Session" };
  }
};
