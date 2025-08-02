"use server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/middlewares/auth";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function revalidateUserProfile(targetUsername: string) {
  revalidateTag(`/profile/${targetUsername}`);
}

export async function getTokensFromCookies() {
  return {
    accessToken: cookies().get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: cookies().get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

export async function deleteTokensFromCookies() {
  cookies().delete(ACCESS_TOKEN_COOKIE);
  cookies().delete(REFRESH_TOKEN_COOKIE);
}
