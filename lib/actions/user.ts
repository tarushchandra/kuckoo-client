"use server";
import { revalidatePath } from "next/cache";

export default async function revalidateProfileUser(
  sessionUsername: string,
  profileUsername: string
) {
  revalidatePath(`/profile/${sessionUsername}`);
  revalidatePath(`/profile/${profileUsername}`);
}
