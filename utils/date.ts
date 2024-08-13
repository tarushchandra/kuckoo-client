import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const getModifiedDateInNumbers = (createdAt: string) => {
  const createdAtDate = dayjs(Number(createdAt));
  return createdAtDate.format("DD/MM/YY");
};

export const getModifiedDate = (createdAt: string) => {
  const createdAtDate = dayjs(Number(createdAt));

  if (createdAtDate.isToday()) return "Today";
  if (createdAtDate.isYesterday()) return "Yesterday";
  return getModifiedDateInNumbers(createdAt);
};

export const getModifiedDateForChatCard = (createdAt: string) => {
  const createdAtDate = dayjs(Number(createdAt));

  if (createdAtDate.isToday()) return createdAtDate.format("h:mm a");
  if (createdAtDate.isYesterday()) return "Yesterday";
  return createdAtDate.format("DD/MM/YY");
};

export const getModifiedLastSeenDateForChat = (lastSeenAt: string) => {
  const lastSeenAtDate = dayjs(Number(lastSeenAt));

  if (lastSeenAtDate.isToday())
    return `last seen today at ${lastSeenAtDate.format("h:mm a")}`;
  if (lastSeenAtDate.isYesterday())
    return `last seen yesterday at ${lastSeenAtDate.format("h:mm a")}`;
  return `last seen at ${getModifiedDateInNumbers(
    lastSeenAt
  )}, ${lastSeenAtDate.format("h:mm a")}`;
};
