import {
  Chat,
  ChatActivity,
  ChatActivityType,
  ChatHistory,
  User,
} from "@/gql/graphql";
import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { fetchChatHistory } from "./chatThunks";

interface initialStateType {
  totalChats: Chat[] | null;
  chatHistories: {
    [chatId: string]: {
      data: ChatHistory[];
      isDataFetched: boolean;
      isDataLoading: boolean;
      isUnseenChat: boolean;
      isNewChat: boolean;
    };
  };
  selectedChat: Chat | null;
  unseenChatsCount: number;
  isIncomingMessageChatSelected: boolean | null;
  typingUsers: {
    [chatId: string]: { user: { firstName: string } };
  };
}

const initialState: initialStateType = {
  totalChats: null,
  chatHistories: {},
  selectedChat: null,
  unseenChatsCount: 0,
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
      const { id: chatId } = action.payload;

      // creating the new chat in the sender's UI
      if (!state.chatHistories[chatId] && typeof chatId === "number") {
        state.chatHistories[chatId] = {
          data: [],
          isDataFetched: false,
          isDataLoading: false,
          isUnseenChat: false,
          isNewChat: true,
        };
      }

      state.selectedChat = action.payload;
    },

    removeSelectedChat: (state) => {
      state.selectedChat = null;
    },

    addTypingUser: (state, action) => {
      const { chatId, user } = action.payload;
      state.typingUsers[chatId] = { user };
    },

    removeTypingUser: (state, action) => {
      delete state.typingUsers[action.payload.chatId];
    },

    addFetchedUnseenChatsCount: (state, action) => {
      state.unseenChatsCount = action.payload;
    },

    setChatAsSeen: (state) => {
      if (state.selectedChat?.id === null) return;

      const chat = state.totalChats?.find(
        (x) => x.id === state.selectedChat!.id
      );
      chat!.unseenMessagesCount = 0;
      state.selectedChat!.unseenMessagesCount = 0;

      state.chatHistories[state.selectedChat?.id!].isUnseenChat = false;
      state.unseenChatsCount--;
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
      }
    },

    setMessageIsRecivedByTheServer: (state, action) => {
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

    replaceTemporaryChatOrMessagesIdWithActualIds: (state, action) => {
      // replace the temporary chatId with actual Id if present
      if (action.payload?.chat) {
        const { temporaryChatId, actualChatId, creator } = action.payload.chat;

        state.chatHistories[actualChatId] =
          state.chatHistories[temporaryChatId];
        delete state.chatHistories[temporaryChatId];

        const targetChat = state.totalChats?.find(
          (x) => x.id === temporaryChatId
        );
        targetChat!.id = actualChatId;

        if (
          creator.id === action.payload.sessionUser.id ||
          state.selectedChat?.id === temporaryChatId
        )
          state.selectedChat = targetChat!;
      }

      // replace the temporary messagesId with actual Ids
      const { chatId, messages } = action.payload.messages;
      const chatHistory = state.chatHistories[chatId];

      for (const message of messages) {
        const { temporaryMessageId, actualMessageId, sender } = message;

        chatHistoryLoop: for (const chatHistoryItem of chatHistory.data) {
          const unseenMessages = chatHistoryItem.messages?.unseenMessages!;
          const seenMessages = chatHistoryItem.messages?.seenMessages!;
          const sessionUserMessages =
            chatHistoryItem.messages?.sessionUserMessages!;

          if (sender.id === action.payload.sessionUser.id) {
            for (const sessionUserMessage of sessionUserMessages) {
              if (
                typeof sessionUserMessage?.id === "number" &&
                sessionUserMessage.id === temporaryMessageId
              ) {
                sessionUserMessage.id = actualMessageId;
                break chatHistoryLoop;
              }
            }
          } else {
            for (const unseenMessage of unseenMessages) {
              if (
                typeof unseenMessage?.id === "number" &&
                unseenMessage.id === temporaryMessageId
              ) {
                unseenMessage.id = actualMessageId;
                break chatHistoryLoop;
              }
            }

            for (const seenMessage of seenMessages) {
              if (
                typeof seenMessage?.id === "number" &&
                seenMessage.id === temporaryMessageId
              ) {
                seenMessage.id = actualMessageId;
                break chatHistoryLoop;
              }
            }
          }
        }
      }
    },

    replaceTemporaryChatIdWithActualChatId: (state, action) => {
      const { temporaryChatId, actualChatId, creator, sessionUser } =
        action.payload;

      state.chatHistories[actualChatId] = state.chatHistories[temporaryChatId];
      delete state.chatHistories[temporaryChatId];

      const targetChat = state.totalChats?.find(
        (x) => x.id === temporaryChatId
      );
      targetChat!.id = actualChatId;

      if (creator.id === sessionUser.id) state.selectedChat = targetChat!;
    },

    replaceTemporaryMessageIdWithActualMessageId: (state, action) => {
      const {
        chatId,
        temporaryMessageId,
        actualMessageId,
        sessionUser,
        sender,
      } = action.payload;

      const chatHistory = state.chatHistories[chatId];
      const unseenMessages = chatHistory.data[0].messages?.unseenMessages!;
      const seenMessages = chatHistory.data[0].messages?.seenMessages!;
      const sessionUserMessages =
        chatHistory.data[0].messages?.sessionUserMessages!;

      if (sender.id === sessionUser.id) {
        for (const sessionUserMessage of sessionUserMessages) {
          if (
            typeof sessionUserMessage?.id === "number" &&
            sessionUserMessage.id === temporaryMessageId
          ) {
            sessionUserMessage.id = actualMessageId;
            return;
          }
        }
      } else {
        for (const unseenMessage of unseenMessages) {
          if (
            typeof unseenMessage?.id === "number" &&
            unseenMessage.id === temporaryMessageId
          ) {
            unseenMessage.id = actualMessageId;
            return;
          }
        }

        for (const seenMessage of seenMessages) {
          if (
            typeof seenMessage?.id === "number" &&
            seenMessage.id === temporaryMessageId
          ) {
            seenMessage.id = actualMessageId;
            return;
          }
        }
      }
    },

    addMessage: (state, action) => {
      const { messagePayload, sessionUser, isMessagesPathSelected } =
        action.payload;

      console.log("messagePayload -", messagePayload);

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
      // let chatId;

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
          isUnseenChat: isMessageSentBySessionUser ? false : true,
          isNewChat: typeof messagePayload.chatId === "number" ? true : false,
        };
      } else {
        const chatHistory = state.chatHistories[messagePayload.chatId].data;

        /* 
            - firstly, mark the previous unseen messages as seen (both for sender as well as recipient) if the incoming message chat is selected 
            - secondly, mark the chat as seen or unseen accordingly 
          */
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

          state.chatHistories[messagePayload.chatId].isUnseenChat = false;
        } else state.chatHistories[messagePayload.chatId].isUnseenChat = true;

        if (chatHistory[0]?.date === messageCreatedAtDate) {
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

      // updating (adding) the state.unseenChatsCount
      if (!isMessageSentBySessionUser || !state.isIncomingMessageChatSelected) {
        let unseenChatsCount = 0;
        for (const key in state.chatHistories) {
          if (state.chatHistories[key].isUnseenChat) unseenChatsCount++;
        }
        state.unseenChatsCount = unseenChatsCount;
      }

      // Adding the new chat to the totalChats
      if (typeof messagePayload.chatId === "number") {
        const currentChat = state.totalChats?.find(
          (x) => x.id === messagePayload.chatId
        );

        if (currentChat) {
          currentChat.latestMessage = messagePayload.message;
          if (!isMessageSentBySessionUser) {
            currentChat.unseenMessagesCount =
              currentChat.unseenMessagesCount! + 1;
          }
        } else {
          const newChat = {
            id: messagePayload.chatId,
            name: null,
            isGroupChat: false,
            totalMembersCount: messagePayload.targetUsers.length + 1,
            createdAt: String(Date.now()),
            creator: messagePayload.creator,
            members: isMessageSentBySessionUser
              ? messagePayload.targetUsers
              : [messagePayload.creator],
            latestMessage: messagePayload.message,
            unseenMessagesCount: isMessageSentBySessionUser ? 0 : 1,
          } as any;

          state.totalChats = [newChat, ...state.totalChats!];
          if (isMessageSentBySessionUser) state.selectedChat = newChat;
        }
      } else {
        // Re-ording of chats only possible if they are actually present
        if (!state.totalChats || state.totalChats?.length === 0) return;

        const filteredChat = state.totalChats?.filter(
          (x) => x.id === messagePayload.chatId
        );
        const remainingChats = state.totalChats?.filter(
          (x) => x.id !== messagePayload.chatId
        );

        filteredChat![0].latestMessage = messagePayload.message;
        if (!isMessageSentBySessionUser) {
          filteredChat![0].unseenMessagesCount =
            filteredChat![0].unseenMessagesCount! + 1;
        }
        state.totalChats = [filteredChat![0], ...remainingChats!];

        if (state.selectedChat?.id === messagePayload.chatId)
          state.selectedChat = filteredChat![0];
      }
    },

    renameChatGroupName: (state, action) => {
      // rename the selectedChat's group name
      state.selectedChat!.name = action.payload.chatName;

      // rename the the chatGroupName from the totalChats Array
      const targetChat = state.totalChats?.find(
        (x: any) => x.id === action.payload.id
      );
      targetChat!.name = action.payload.chatName;
      const remainingChats = state.totalChats?.filter(
        (x: any) => x.id !== action.payload.id
      );

      // console.log("mutated chat -", mutatedChat);
      state.totalChats = [targetChat!, ...remainingChats!];
    },

    addMembersToGroup: (state, action) => {
      const { chatId, selectedUsers, sessionUser } = action.payload;
      const currentDate = new Date();
      const currentDateString = currentDate.toDateString();

      const activities = selectedUsers.map((selectedUser: User) => ({
        id: Math.random(),
        type: ChatActivityType.MemberAdded,
        user: sessionUser,
        targetUser: selectedUser,
        createdAt: currentDate,
      }));

      const chatHistory = state.chatHistories[chatId].data;

      if (chatHistory[0].date !== currentDateString) {
        const chatHistoryItem = {
          date: currentDate,
          activities,
          messages: {
            unseenMessages: <any>[],
            seenMessages: <any>[],
            sessionUserMessages: <any>[],
          },
        };
      } else {
        activities.forEach((activity: ChatActivity) => {
          chatHistory[0].activities?.unshift(activity);
        });
      }
    },

    removeMemberFromGroup: (state, action) => {
      const { chatId, sessionUser, targetUser } = action.payload;

      const activity: any = {
        id: Math.random(),
        type: ChatActivityType.MemberRemoved,
        user: sessionUser,
        targetUser,
        createdAt: new Date(),
      };
      const chatHistory = state.chatHistories[chatId].data;
      chatHistory[0].activities?.unshift(activity);
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
            isUnseenChat: false,
            isNewChat: false,
          };

        state.chatHistories[chatId].isDataLoading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        const {
          arg: { chatId },
        } = action.meta;
        const fetchedChatHistory = action.payload;
        state.chatHistories[chatId].data = fetchedChatHistory as any;
        state.chatHistories[chatId].isDataLoading = false;
        state.chatHistories[chatId].isDataFetched = true;
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
  removeSelectedChat,
  addMessage,
  setChatAsSeen,
  setUnseenMessagesAsSeen,
  addTypingUser,
  removeTypingUser,
  setMessageIsRecivedByTheServer,
  replaceTemporaryMessageIdWithActualMessageId,
  renameChatGroupName,
  addMembersToGroup,
  removeMemberFromGroup,
  replaceTemporaryChatIdWithActualChatId,
  replaceTemporaryChatOrMessagesIdWithActualIds,
  addFetchedUnseenChatsCount,
} = chatsSlice.actions;
export default chatsSlice.reducer;
