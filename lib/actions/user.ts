"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateProfileUser(
  sessionUsername: string,
  profileUsername: string
) {
  console.log("revalidate user -", sessionUsername, profileUsername);

  revalidatePath(`/profile/${sessionUsername}`);
  revalidatePath(`/profile/${profileUsername}`);
}

// revalidatePath("/profile/[username]", "page");

// revalidateTag(sessionUsername);
// revalidateTag(profileUsername);
