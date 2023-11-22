import { SignInOptions, signIn } from "next-auth/react";

export const loginGoogle = (options: SignInOptions = {}) => signIn("google", options)
export const login = loginGoogle
