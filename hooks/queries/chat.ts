import { Chat, GroupedMessages } from "@/gql/graphql";
import {
  getChatMembersQuery,
  getChatMessagesQuery,
  getChatsQuery,
} from "@/graphql/queries/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const useChats = () => {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: () => graphqlClient.request(getChatsQuery),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["chats"] });
    };
  }, []);

  return data?.getChats;
};

// export const useChatMessages = (chat: Chat) => {
//   console.log("chat in useChatMessages -", chat);

//   const [groupedMessages, setGroupMessages] = useState<
//     GroupedMessages[] | null
//   >(() => {
//     console.log("chatId in useState CB -", chat.id);

//     if (chat.id === "default-chat-id") {
//       console.log("chatId in if condition -", chat.id);
//       return [
//         {
//           date: new Date(chat.createdAt!).toDateString(),
//           messages: [chat.latestMessage],
//         },
//       ] as GroupedMessages[];
//     } else return null;
//   });

//   console.log("groupedMessages -", groupedMessages);

//   useEffect(() => {
//     if (chat.id === null || chat.id === "default-chat-id") return;

//     const fetchMessages = async () => {
//       const data = await queryClient.fetchQuery({
//         queryKey: ["chat-messages", chat.id],
//         queryFn: () =>
//           graphqlClient.request(getChatMessagesQuery, { chatId: chat.id }),
//       });
//       setGroupMessages(data.getChatMessages as GroupedMessages[]);
//     };
//     fetchMessages();

//     return () => {
//       setGroupMessages(null);
//     };
//   }, [chat.id]);

//   return groupedMessages;
// };

// if (chat.id === "default-chat-id") {
//   const defaultChatMessages = {
//     date: new Date(chat.createdAt!).toDateString(),
//     messages: [chat.latestMessage],
//   };
//   return [defaultChatMessages];
// }

// ----------------------------------------------------------------------------------

// export const useChatMessages = (chat: Chat) => {
//   const { data } = useQuery({
//     queryKey: ["chat-messages", chat.id],
//     queryFn: () =>
//       graphqlClient.request(getChatMessagesQuery, { chatId: chat.id }),
//   });

//   // useEffect(() => {
//   //   return () => {
//   //     queryClient.invalidateQueries({ queryKey: ["chat-messages", chat.id] });
//   //   };
//   // }, [chat.id]);

//   console.log("data -", data);

//   const map = new Map();

//   if (map.has("default-chat-id")) {
//     return map.get("default-chat-id");
//   }

//   if (!data || data.getChatMessages.length === 0) {
//     if (chat.id === "default-chat-id") {
//       const groupedMessages = [
//         {
//           date: new Date(chat.createdAt!).toDateString(),
//           messages: [chat.latestMessage],
//         },
//       ];
//       map.set("default-chat-id", groupedMessages);
//       return groupedMessages;
//     }
//   }

//   return data?.getChatMessages;
// };

// --------------------------------------------------------------------------------

export const useChatMessages = (chat: Chat) => {
  const { data } = useQuery({
    queryKey: ["chat-messages", chat.id],
    queryFn: () => {
      if (!chat.id) return;
      return graphqlClient.request(getChatMessagesQuery, { chatId: chat.id });
    },
  });

  const cacheRef = useRef<GroupedMessages[] | null>(null);

  useEffect(() => {
    if (chat.id === "default-chat-id") return;
    cacheRef.current = null;

    return () => {
      queryClient.invalidateQueries({ queryKey: ["chat-messages", chat.id] });
    };
  }, [chat.id]);

  if (cacheRef.current) {
    return cacheRef.current;
  }

  if (!data || data.getChatMessages.length === 0) {
    if (chat.id === "default-chat-id") {
      const groupedMessages = [
        {
          date: new Date(chat.createdAt!).toDateString(),
          messages: [chat.latestMessage],
        },
      ] as GroupedMessages[];
      cacheRef.current = groupedMessages;
      return groupedMessages;
    }
  }

  return data?.getChatMessages;
};

export const useChatMembers = (chatId: string) => {
  const { data } = useQuery({
    queryKey: ["chat-members", chatId],
    queryFn: () => graphqlClient.request(getChatMembersQuery, { chatId }),
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["chat-members", chatId] });
    };
  }, [chatId]);

  return data?.getChatMembers;
};
