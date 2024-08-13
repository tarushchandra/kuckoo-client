import { Chat, ChatHistory } from "@/gql/graphql";
import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { fetchChatHistory } from "./chatThunks";

interface initialStateType {
  totalChats: Chat[];
  chatHistories: {
    [chatId: string]: {
      data: ChatHistory[];
      isDataFetched: Boolean;
      isDataLoading: Boolean;
    };
  };
  selectedChat: Chat | null;
  isIncomingMessageChatSelected: boolean | null;
  typingUsers: {
    [chatId: string]: { user: { firstName: string } };
  };
}

const initialState: initialStateType = {
  totalChats: [],
  chatHistories: {},
  selectedChat: null,
  isIncomingMessageChatSelected: null,
  typingUsers: {},
};

export const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChats: (state, action) => {
      state.totalChats = action.payload;
    },

    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    addTypingUser: (state, action) => {
      const { chatId, user } = action.payload;
      state.typingUsers[chatId] = { user };
    },

    removeTypingUser: (state, action) => {
      delete state.typingUsers[action.payload.chatId];
    },

    setChatAsSeen: (state) => {
      const chat = state.totalChats.find(
        (x) => x.id === state.selectedChat!.id
      );
      chat!.unseenMessagesCount = 0;

      state.selectedChat!.unseenMessagesCount = 0;
    },

    setUnseenMessagesAsSeen: (state, action) => {
      const { actionType, payload } = action.payload;
      const chatHistory = state.chatHistories[payload.chatId];
      if (!chatHistory) return;

      // setting the unseen messages as seen at recipient's end
      if (actionType === "SETTING_THE_UNSEEN_MESSAGES_AS_SEEN_FOR_RECIPIENT") {
        for (const chatHistoryItem of chatHistory.data) {
          const unseenMessages = chatHistoryItem.messages?.unseenMessages;
          if (unseenMessages?.length === 0) break;

          const seenMessages = chatHistoryItem.messages?.seenMessages;
          chatHistoryItem.messages!.seenMessages = [
            ...unseenMessages!,
            ...seenMessages!,
          ];
          chatHistoryItem.messages!.unseenMessages = [];
        }
      }

      // setting the unseen messages as seen at sender's end
      if (actionType === "SETTING_THE_UNSEEN_MESSAGES_AS_SEEN_FOR_SENDER") {
        for (const chatHistoryItem of chatHistory.data) {
          const sessionUserMessages =
            chatHistoryItem.messages?.sessionUserMessages;

          sessionUserMessages?.forEach((message) => {
            const hasRecipientSeenTheMessage = message?.seenBy?.find(
              (x) => x?.id === payload.seenBy.id
            );
            if (hasRecipientSeenTheMessage) return;
            message?.seenBy!.push(payload.seenBy);
          });
        }

        // payload.messages.forEach((messageContent: string) => {
        //   for (const chatHistoryItem of chatHistory.data) {
        //     const sessionUserMessages =
        //       chatHistoryItem.messages?.sessionUserMessages!;

        //     for (const sessionUserMessage of sessionUserMessages) {
        //       if (messageContent !== sessionUserMessage?.content) return;
        //       if (!sessionUserMessage.seenBy)
        //         sessionUserMessage.seenBy = [{ ...payload.seenBy }];
        //       else sessionUserMessage.seenBy.push(payload.seenBy);
        //     }
        //   }
        // });
      }
    },

    setMessageIsSentToRecipient: (state, action) => {
      const chatHistory = state.chatHistories[action.payload.chatId].data;
      chatHistory.forEach((chatHistoryItem) => {
        const sessionUserMessages =
          chatHistoryItem.messages?.sessionUserMessages;

        sessionUserMessages?.forEach((message) => {
          if (message?.id === action.payload.messageId) {
            message!.seenBy! = [];
            return;
          }
        });
      });
    },

    addMessage: (state, action) => {
      const { messagePayload, sessionUser } = action.payload;

      const isMessageSentBySessionUser =
        messagePayload.message.sender.id === sessionUser.id;

      // checking whether is incoming message's chat is selected or not
      if (state.selectedChat?.id === messagePayload.chatId) {
        if (isMessageSentBySessionUser)
          state.isIncomingMessageChatSelected = null;
        else state.isIncomingMessageChatSelected = true;
      } else state.isIncomingMessageChatSelected = false;

      // appending the message to the chat
      const messageCreatedAtDate = new Date(
        Number(messagePayload.message.createdAt)
      ).toDateString();

      const chatHistoryObj = state.chatHistories[messagePayload.chatId];

      if (!chatHistoryObj) {
        const chatHistoryItem = {
          date: messageCreatedAtDate,
          activities: [],
          messages: {
            unseenMessages: <any>[],
            seenMessages: <any>[],
            sessionUserMessages: <any>[],
          },
        };

        if (isMessageSentBySessionUser)
          chatHistoryItem.messages.sessionUserMessages.unshift(
            messagePayload.message
          );
        else
          chatHistoryItem.messages.unseenMessages.unshift(
            messagePayload.message
          );

        state.chatHistories[messagePayload.chatId] = {
          data: [chatHistoryItem],
          isDataFetched: false,
          isDataLoading: false,
        };
      } else {
        const chatHistory = state.chatHistories[messagePayload.chatId].data;

        // firstly, mark the unseen messages as seen
        if (state.isIncomingMessageChatSelected || isMessageSentBySessionUser) {
          for (const chatHistoryItem of chatHistory) {
            const unseenMessages = chatHistoryItem.messages?.unseenMessages;
            if (unseenMessages?.length === 0) break;

            const seenMessages = chatHistoryItem.messages?.seenMessages;
            chatHistoryItem.messages!.seenMessages = [
              ...unseenMessages!,
              ...seenMessages!,
            ];
            chatHistoryItem.messages!.unseenMessages = [];
          }
        }

        if (chatHistory[0].date === messageCreatedAtDate) {
          if (isMessageSentBySessionUser)
            chatHistory[0].messages?.sessionUserMessages?.unshift(
              messagePayload.message
            );
          else
            chatHistory[0].messages?.unseenMessages?.unshift(
              messagePayload.message
            );
        } else {
          const chatHistoryItem = {
            date: messageCreatedAtDate,
            activities: [],
            messages: {
              unseenMessages: <any>[],
              seenMessages: <any>[],
              sessionUserMessages: <any>[],
            },
          };

          if (isMessageSentBySessionUser)
            chatHistoryItem.messages?.sessionUserMessages?.unshift(
              messagePayload.message
            );
          else
            chatHistoryItem.messages?.unseenMessages?.unshift(
              messagePayload.message
            );

          chatHistory.unshift(chatHistoryItem);
        }
      }

      // Re-ording the current chats list
      const filteredChat = state.totalChats.filter(
        (x) => x.id === messagePayload.chatId
      );
      const remainingChats = state.totalChats.filter(
        (x) => x.id !== messagePayload.chatId
      );

      filteredChat[0].latestMessage = messagePayload.message;
      if (!isMessageSentBySessionUser) {
        filteredChat[0].unseenMessagesCount =
          filteredChat[0].unseenMessagesCount! + 1;
      }
      state.totalChats = [filteredChat[0], ...remainingChats];

      if (state.selectedChat?.id === messagePayload.chatId)
        state.selectedChat = filteredChat[0];
    },
  },
  extraReducers: (builder) => {
    // chat/fetchChatHistory
    builder
      .addCase(fetchChatHistory.pending, (state, action) => {
        const {
          arg: { chatId },
        } = action.meta;

        if (!state.chatHistories[chatId])
          state.chatHistories[chatId] = {
            data: [],
            isDataFetched: false,
            isDataLoading: false,
          };

        state.chatHistories[chatId].isDataLoading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        const {
          arg: { chatId, recentChatHistory },
        } = action.meta;

        const fetchedChatHistory = action.payload;
        const chatHistoryObj = state.chatHistories[chatId];

        if (recentChatHistory)
          chatHistoryObj.data = [
            ...recentChatHistory!,
            ...fetchedChatHistory!,
          ] as any;
        else chatHistoryObj.data = fetchedChatHistory as any;

        chatHistoryObj.isDataLoading = false;
        chatHistoryObj.isDataFetched = true;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        const {
          arg: { chatId },
        } = action.meta;

        if (state.chatHistories[chatId]) {
          state.chatHistories[chatId].isDataLoading = false;
          state.chatHistories[chatId].isDataFetched = false;
        }
      });
  },
});

export const {
  addChats,
  selectChat,
  addMessage,
  setChatAsSeen,
  setUnseenMessagesAsSeen,
  addTypingUser,
  removeTypingUser,
  setMessageIsSentToRecipient,
} = chatsSlice.actions;
export default chatsSlice.reducer;
