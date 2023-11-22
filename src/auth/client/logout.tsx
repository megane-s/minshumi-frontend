import { SignOutParams, signOut } from "next-auth/react";

export const logout = (params: SignOutParams = {}) => signOut(params)
