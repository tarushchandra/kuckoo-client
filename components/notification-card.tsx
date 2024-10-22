import { Notification, NotificationType } from "@/gql/graphql";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import SocialButtons from "./social-buttons";

dayjs.extend(relativeTime);

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard(props: NotificationCardProps) {
  const { notification } = props;
  const { createdAt, sender, type, metaData } = notification;
  const formattedCreatedAt = dayjs(Number(createdAt)).fromNow();

  return (
    <div className="flex gap-2 items-start p-4 border-b border-zinc-800 cursor-pointer hover:bg-zinc-950">
      <Link href={`/profile/${sender.username}`}>
        <Image
          src={sender.profileImageURL!}
          alt="user-image"
          className="rounded-full transition-all hover:opacity-90"
          width={40}
          height={40}
        />
      </Link>
      <div className="flex xs:max-xs1:flex-col xs1:justify-between gap-2 w-full">
        <Link
          href={
            metaData
              ? `/tweet/${metaData.tweet?.id}`
              : `profile/${sender.username}`
          }
          className="flex flex-col w-full"
        >
          <div className="flex gap-2 items-center text-sm">
            <Link
              href={`/profile/${sender?.username}`}
              className="font-semibold hover:underline"
            >
              {sender?.firstName} {sender?.lastName}
            </Link>
            <div className="flex items-center gap-2 text-zinc-500">
              <span>@{sender?.username}</span>
              <div className="bg-zinc-500 w-1 h-1 rounded-full" />
              <span>{formattedCreatedAt}</span>
            </div>
          </div>

          <>
            {type === NotificationType.LikeOnTweet && (
              <h2 className="text-sm ">❤️ liked your tweet.</h2>
            )}

            {type === NotificationType.CommentOnTweet && (
              <>
                <h2 className="text-sm ">commented on your tweet:</h2>
                <h2 className="text-sm ">
                  {notification.metaData?.comment?.content}
                </h2>
              </>
            )}

            {type === NotificationType.LikeOnComment && (
              <h2 className="text-sm ">
                ❤️ liked your comment:{" "}
                <span className="text-zinc-500">
                  {notification.metaData?.comment?.content}
                </span>
              </h2>
            )}

            {type === NotificationType.ReplyOnComment && (
              <>
                <h2 className="text-sm">
                  replied to your comment:{" "}
                  <span className="text-zinc-500">
                    {notification.metaData?.comment?.content}
                  </span>
                </h2>
                <h2 className="text-sm">
                  {notification.metaData?.repliedComment?.content}
                </h2>
              </>
            )}

            {type === NotificationType.Follow && (
              <h2 className="text-sm ">started following you.</h2>
            )}
          </>
        </Link>

        <>
          {notification.metaData?.tweet && (
            <div className="rounded-md">
              <Image
                src={notification.metaData.tweet?.imageURL!}
                alt="tweet-image"
                width={100}
                height={70}
                className="border border-zinc-800 rounded-md"
              />
            </div>
          )}

          {type === NotificationType.Follow && (
            <SocialButtons targetUser={sender} className="px-4 py-2" />
          )}
        </>
      </div>
    </div>
  );
}
