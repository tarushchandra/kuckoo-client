"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateProfileUser(
  sessionUsername: string,
  profileUsername: string
) {
  revalidatePath(`/profile/${sessionUsername}`);
  revalidatePath(`/profile/${profileUsername}`);
}
