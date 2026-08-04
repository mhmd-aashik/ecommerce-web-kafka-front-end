"use server";

import { signIn, signOut } from "@/auth";

export async function login() {
  await signIn("keycloak", {
    redirectTo: "/products",
  });
}

export async function logout() {
  await signOut({
    redirectTo: "/",
  });
}
