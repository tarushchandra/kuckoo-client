"use server";
import { revalidateTag } from "next/cache";

export async function revalidateUserProfile(targetUsername: string) {
  revalidateTag(`/profile/${targetUsername}`);
}
