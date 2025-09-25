"use server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/middlewares/auth";
import { deleteAuthCookies } from "@/services/auth";

export async function getTokensFromCookies() {
  return {
    accessToken: cookies().get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: cookies().get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

export async function deleteTokensAndRedirectToSignInPage() {
  await deleteAuthCookies();
  window.location.href = "/sign-in";
}
