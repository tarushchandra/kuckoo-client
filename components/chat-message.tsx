import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import Image from "next/image";
import dayjs from "dayjs";
import { Message } from "@/gql/graphql";

export default function ChatMessage({ message }: { message: Message }) {
  const { data: sessionUser } = useAuth(selectUser);

  const messageCreatedAt = dayjs(Number(message?.createdAt));
  const time = messageCreatedAt.format("h:mm a");

  return (
    <div
      className={mergeClasses(
        "flex items-center gap-2",
        message?.sender?.username === sessionUser?.username &&
          "flex-row-reverse"
      )}
    >
      <div>
        <Image
          src={message?.sender?.profileImageURL!}
          alt="sender-image"
          width={25}
          height={25}
          className="rounded-full"
        />
      </div>
      <div
        className={mergeClasses(
          "flex flex-col gap-1",
          message?.sender?.username === sessionUser?.username && "items-end"
        )}
      >
        <div
          className={mergeClasses(
            "w-96 flex",
            message.sender?.username === sessionUser?.username && "justify-end"
          )}
        >
          <h2
            className={mergeClasses(
              "bg-zinc-800 text-sm p-2 rounded-lg",
              message?.sender?.username === sessionUser?.username &&
                "bg-[#1D9BF0]"
            )}
          >
            {message?.content}
          </h2>
        </div>
        <h2 className="text-xs font-medium text-zinc-500">{time}</h2>
      </div>
    </div>
  );
}
