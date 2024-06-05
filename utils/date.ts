import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const getModifiedDate = (createdAt: string) => {
  const createdAtDate = dayjs(Number(createdAt));

  if (createdAtDate.isToday()) return "Today";
  if (createdAtDate.isYesterday()) return "Yesterday";
  return createdAtDate.format("ddd, D MMM YYYY");
};

export const getModifiedDateForChatCard = (createdAt: string) => {
  const createdAtDate = dayjs(Number(createdAt));

  if (createdAtDate.isToday()) return createdAtDate.format("h:mm a");
  if (createdAtDate.isYesterday()) return "Yesterday";
  return createdAtDate.format("DD/MM/YY");
};
