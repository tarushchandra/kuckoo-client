import { ChatActivity as chatActivity, ChatActivityType } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

export default function ChatActivity({ activity }: { activity: chatActivity }) {
  const { data: sessionUser } = useAuth(selectUser);
  const { type, user, targetUser } = activity;

  return (
    <div className="flex justify-center">
      {type === ChatActivityType.MemberAdded && (
        <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-800 text-zinc-200 ">
          <span>
            {activity?.user?.username === sessionUser?.username
              ? "You"
              : user?.firstName + " " + user?.lastName}
          </span>{" "}
          <span>added</span>{" "}
          <span>
            {activity?.targetUser?.username === sessionUser?.username
              ? "You"
              : targetUser?.firstName + " " + targetUser?.lastName}
          </span>
        </h2>
      )}

      {type === ChatActivityType.MemberRemoved && (
        <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-800 text-zinc-200 ">
          <span>
            {activity?.user?.username === sessionUser?.username
              ? "You"
              : user?.firstName + " " + user?.lastName}
          </span>{" "}
          <span>removed</span>{" "}
          <span>
            {activity?.targetUser?.username === sessionUser?.username
              ? "You"
              : targetUser?.firstName + " " + targetUser?.lastName}
          </span>
        </h2>
      )}

      {type === ChatActivityType.MadeAdmin && (
        <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-800 text-zinc-200 ">
          <span>
            {activity?.user?.username === sessionUser?.username
              ? "You"
              : user?.firstName + " " + user?.lastName}
          </span>{" "}
          <span>made</span>{" "}
          <span>
            {activity?.targetUser?.username === sessionUser?.username
              ? "You"
              : targetUser?.firstName + " " + targetUser?.lastName}
          </span>
          <span>an admin</span>
        </h2>
      )}
    </div>
  );
}
