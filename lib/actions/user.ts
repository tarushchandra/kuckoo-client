"use server";
import { User } from "@/gql/graphql";
import { revalidatePath, revalidateTag } from "next/cache";

/* 
  bug solved: Using the solution below
  - When user is followed or unfollowed from recommened users panel or 
    /all-users page, then profile user cache is not revalidated.
  - which results in inconsistent mutual followers info which is being displayed
    on the profile page of the user.

  Possible solution:
  - when the session user follows or unfollows the target user, invalidate 
    all the profile pages of the followings of the target user.
*/

export default async function revalidateProfileUser(
  sessionUsername: string,
  targetUsername: string
) {
  console.log("users to revalide -");
  console.log("sesssion user -", sessionUsername);
  console.log("target user -", targetUsername);

  revalidateTag(`/profile/${sessionUsername}`);
  revalidateTag(`/profile/${targetUsername}`);

  // targetUser.followings?.forEach((following) => {
  //   revalidateTag(`/profile/${following?.username}`);
  //   console.log(`reavalidated - /profile/${following?.username}`);
  // });

  /* 
    - invalidates the profile user cache when any user is being followed 
      or unfollowed from that particular profile user's followers list.
  */
  // if (profileUsername) revalidateTag(`/profile/${profileUsername}`);
}
