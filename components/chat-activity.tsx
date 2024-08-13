import {
  Chat,
  ChatActivity as chatActivity,
  ChatActivityType,
} from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { useAppSelector } from "@/hooks/redux";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

export default function ChatActivity({ activity }: { activity: chatActivity }) {
  const { data: sessionUser } = useAuth(selectUser);
  const selectedChat = useAppSelector((store) => store.chat.selectedChat);

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
          </span>{" "}
          <span>to the group</span>
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
          </span>{" "}
          <span>from the group</span>
        </h2>
      )}

      {type === ChatActivityType.AdminAdded && (
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
          </span>{" "}
          <span>as an admin</span>
        </h2>
      )}

      {type === ChatActivityType.AdminRemoved && (
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
          </span>{" "}
          <span>as an admin</span>
        </h2>
      )}

      {type === ChatActivityType.MemberLeft && (
        <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-800 text-zinc-200 ">
          <span>
            {activity?.user?.username === sessionUser?.username
              ? "You"
              : user?.firstName + " " + user?.lastName}
          </span>{" "}
          <span>left the group</span>
        </h2>
      )}

      {type === ChatActivityType.ChatRenamed && (
        <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-800 text-zinc-200 ">
          <span>
            {activity?.user?.username === sessionUser?.username
              ? "You"
              : user?.firstName + " " + user?.lastName}
          </span>{" "}
          <span>renamed the group as</span>{" "}
          <span>{`\"${activity.metaData?.chatName}\"`}</span>
        </h2>
      )}
    </div>
  );
}
