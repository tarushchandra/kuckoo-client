/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Chat = {
  __typename?: 'Chat';
  createdAt?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<User>;
  id: Scalars['ID']['output'];
  isGroupChat?: Maybe<Scalars['Boolean']['output']>;
  latestChatContent?: Maybe<ChatContentUnion>;
  latestMessage?: Maybe<Message>;
  members?: Maybe<Array<Maybe<User>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  name?: Maybe<Scalars['String']['output']>;
  totalMembersCount?: Maybe<Scalars['Int']['output']>;
  unseenMessagesCount?: Maybe<Scalars['Int']['output']>;
};

export type ChatActivity = {
  __typename?: 'ChatActivity';
  chat?: Maybe<Chat>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metaData?: Maybe<ChatActivityMetaData>;
  targetUser?: Maybe<User>;
  type?: Maybe<ChatActivityType>;
  user?: Maybe<User>;
};

export type ChatActivityMetaData = {
  __typename?: 'ChatActivityMetaData';
  chatName?: Maybe<Scalars['String']['output']>;
};

export enum ChatActivityType {
  AdminAdded = 'ADMIN_ADDED',
  AdminRemoved = 'ADMIN_REMOVED',
  ChatRenamed = 'CHAT_RENAMED',
  MemberAdded = 'MEMBER_ADDED',
  MemberLeft = 'MEMBER_LEFT',
  MemberRemoved = 'MEMBER_REMOVED'
}

export type ChatContentUnion = ChatActivity | Message;

export type ChatHistory = {
  __typename?: 'ChatHistory';
  activities?: Maybe<Array<Maybe<ChatActivity>>>;
  date: Scalars['String']['output'];
  messages?: Maybe<Messages>;
};

export enum ChatMemberRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type ChatMembership = {
  __typename?: 'ChatMembership';
  chat?: Maybe<Chat>;
  role?: Maybe<ChatMemberRole>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  commentsCount?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCommentLikedBySessionUser?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  parentComment?: Maybe<Comment>;
  repliedTo?: Maybe<Comment>;
  updatedAt: Scalars['String']['output'];
};

export type CreateMessagePayload = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  targetUserIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Message = {
  __typename?: 'Message';
  chat?: Maybe<Chat>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  seenBy?: Maybe<Array<Maybe<User>>>;
  sender?: Maybe<User>;
};

export type Messages = {
  __typename?: 'Messages';
  seenMessages?: Maybe<Array<Maybe<Message>>>;
  sessionUserMessages?: Maybe<Array<Maybe<Message>>>;
  unseenMessages?: Maybe<Array<Maybe<Message>>>;
};

export type MetaData = {
  __typename?: 'MetaData';
  comment?: Maybe<Comment>;
  repliedComment?: Maybe<Comment>;
  tweet?: Maybe<Tweet>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMembersToGroup: Scalars['Boolean']['output'];
  createBookmark: Scalars['Boolean']['output'];
  createComment: Scalars['Boolean']['output'];
  createGroup: Scalars['Boolean']['output'];
  createReply: Scalars['Boolean']['output'];
  createTweet: Scalars['Boolean']['output'];
  createUserWithEmailAndPassword?: Maybe<Scalars['Boolean']['output']>;
  deleteComment: Scalars['Boolean']['output'];
  deleteTweet: Scalars['Boolean']['output'];
  dislikeComment: Scalars['Boolean']['output'];
  dislikeTweet?: Maybe<Scalars['Boolean']['output']>;
  followUser?: Maybe<Scalars['Boolean']['output']>;
  leaveGroup: Scalars['Boolean']['output'];
  likeComment: Scalars['Boolean']['output'];
  likeTweet?: Maybe<Scalars['Boolean']['output']>;
  makeGroupAdmin: Scalars['Boolean']['output'];
  removeBookmark: Scalars['Boolean']['output'];
  removeFollower?: Maybe<Scalars['Boolean']['output']>;
  removeGroupAdmin: Scalars['Boolean']['output'];
  removeMemberFromGroup: Scalars['Boolean']['output'];
  renameGroup: Scalars['Boolean']['output'];
  seenBy: Scalars['Boolean']['output'];
  setNotificationsAsSeen: Scalars['Boolean']['output'];
  unfollowUser?: Maybe<Scalars['Boolean']['output']>;
  updateComment: Scalars['Boolean']['output'];
  updateTweet: Scalars['Boolean']['output'];
};


export type MutationAddMembersToGroupArgs = {
  chatId: Scalars['String']['input'];
  targetUserIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreateBookmarkArgs = {
  tweetId: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  tweetId: Scalars['String']['input'];
};


export type MutationCreateGroupArgs = {
  name: Scalars['String']['input'];
  targetUserIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreateReplyArgs = {
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  tweetId: Scalars['String']['input'];
};


export type MutationCreateTweetArgs = {
  payload: TweetInput;
};


export type MutationCreateUserWithEmailAndPasswordArgs = {
  user: SignUpFormInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
  tweetId: Scalars['String']['input'];
};


export type MutationDeleteTweetArgs = {
  tweetId: Scalars['ID']['input'];
};


export type MutationDislikeCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDislikeTweetArgs = {
  tweetId: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  to: Scalars['ID']['input'];
};


export type MutationLeaveGroupArgs = {
  chatId: Scalars['String']['input'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['String']['input'];
};


export type MutationMakeGroupAdminArgs = {
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
};


export type MutationRemoveBookmarkArgs = {
  tweetId: Scalars['String']['input'];
};


export type MutationRemoveFollowerArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationRemoveGroupAdminArgs = {
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
};


export type MutationRemoveMemberFromGroupArgs = {
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
};


export type MutationRenameGroupArgs = {
  chatId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationSeenByArgs = {
  chatId: Scalars['String']['input'];
  messageIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationUnfollowUserArgs = {
  to: Scalars['ID']['input'];
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};


export type MutationUpdateTweetArgs = {
  payload: TweetInput;
  tweetId: Scalars['ID']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isSeen?: Maybe<Scalars['Boolean']['output']>;
  metaData?: Maybe<MetaData>;
  recipient?: Maybe<User>;
  sender: User;
  type: NotificationType;
};

export enum NotificationType {
  CommentOnTweet = 'COMMENT_ON_TWEET',
  Follow = 'FOLLOW',
  LikeOnComment = 'LIKE_ON_COMMENT',
  LikeOnTweet = 'LIKE_ON_TWEET',
  ReplyOnComment = 'REPLY_ON_COMMENT'
}

export type Notifications = {
  __typename?: 'Notifications';
  seenNotifications: Array<Maybe<Notification>>;
  unseenNotifications: Array<Maybe<Notification>>;
};

export type PaginatedTweets = {
  __typename?: 'PaginatedTweets';
  nextCursor?: Maybe<Scalars['String']['output']>;
  tweets: Array<Maybe<Tweet>>;
};

export type Query = {
  __typename?: 'Query';
  getAllNotifications: Notifications;
  getAllTweets?: Maybe<Array<Maybe<Tweet>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getAvailableMembers: Array<Maybe<User>>;
  getBookmarks?: Maybe<Array<Maybe<Tweet>>>;
  getChat?: Maybe<Chat>;
  getChatHistory?: Maybe<Array<Maybe<ChatHistory>>>;
  getChatMembers: Array<Maybe<ChatMembership>>;
  getChats?: Maybe<Array<Maybe<Chat>>>;
  getComment?: Maybe<Comment>;
  getCommentsOfComment?: Maybe<Array<Maybe<Comment>>>;
  getMutualFollowers?: Maybe<Array<Maybe<User>>>;
  getMutualLikers?: Maybe<Array<Maybe<User>>>;
  getPaginatedTweets: PaginatedTweets;
  getPaginatedTweetsFeed: PaginatedTweets;
  getPeopleWithMessageSeen: Array<Maybe<User>>;
  getRecommendedUsers?: Maybe<Array<Maybe<User>>>;
  getSessionUser?: Maybe<User>;
  getSignedURLForUploadingImage: Scalars['String']['output'];
  getTokens: Scalars['Boolean']['output'];
  getTweet?: Maybe<Tweet>;
  getTweetEngagement?: Maybe<TweetEngagement>;
  getUnseenChatsCount: Scalars['Int']['output'];
  getUnseenNotificationsCount?: Maybe<Scalars['Int']['output']>;
  getUser?: Maybe<User>;
  getUserLastSeen?: Maybe<Scalars['String']['output']>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  isEmailExist?: Maybe<Scalars['Boolean']['output']>;
  isFollowing?: Maybe<Scalars['Boolean']['output']>;
  isUsernameExist?: Maybe<Scalars['Boolean']['output']>;
  verifyRefreshToken: Scalars['Boolean']['output'];
};


export type QueryGetAvailableMembersArgs = {
  chatId: Scalars['String']['input'];
  searchText: Scalars['String']['input'];
};


export type QueryGetChatArgs = {
  targetUserId: Scalars['String']['input'];
};


export type QueryGetChatHistoryArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryGetChatMembersArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryGetCommentArgs = {
  commentId: Scalars['String']['input'];
  tweetId: Scalars['String']['input'];
};


export type QueryGetCommentsOfCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type QueryGetMutualFollowersArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetMutualLikersArgs = {
  tweetId: Scalars['String']['input'];
};


export type QueryGetPaginatedTweetsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetPaginatedTweetsFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryGetPeopleWithMessageSeenArgs = {
  messageId: Scalars['String']['input'];
};


export type QueryGetSignedUrlForUploadingImageArgs = {
  payload: ImageUploadInput;
};


export type QueryGetTokensArgs = {
  googleToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SignInFormInput>;
};


export type QueryGetTweetArgs = {
  tweetId: Scalars['String']['input'];
};


export type QueryGetTweetEngagementArgs = {
  tweetId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetUserLastSeenArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  searchText: Scalars['String']['input'];
};


export type QueryIsEmailExistArgs = {
  email: Scalars['String']['input'];
};


export type QueryIsFollowingArgs = {
  userId: Scalars['String']['input'];
};


export type QueryIsUsernameExistArgs = {
  username: Scalars['String']['input'];
};

export type SignInFormInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpFormInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  tweetEngagement?: Maybe<TweetEngagement>;
  updatedAt: Scalars['String']['output'];
};

export type TweetEngagement = {
  __typename?: 'TweetEngagement';
  comments?: Maybe<Array<Maybe<Comment>>>;
  commentsCount?: Maybe<Scalars['Int']['output']>;
  isTweetBookmarkedBySessionUser?: Maybe<Scalars['Boolean']['output']>;
  isTweetLikedBySessionUser?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Array<Maybe<User>>>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  shares?: Maybe<Scalars['Int']['output']>;
  tweet?: Maybe<Tweet>;
};

export type TweetInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  followers?: Maybe<Array<Maybe<User>>>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  followings?: Maybe<Array<Maybe<User>>>;
  followingsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  lastSeenAt?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  tweetsCount?: Maybe<Scalars['Int']['output']>;
  username: Scalars['String']['output'];
};

export type ImageUploadInput = {
  imageName: Scalars['String']['input'];
  imageType: Scalars['String']['input'];
};

export type CreateGroupMutationMutationVariables = Exact<{
  name: Scalars['String']['input'];
  targetUserIds: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type CreateGroupMutationMutation = { __typename?: 'Mutation', createGroup: boolean };

export type RenameGroupMutationMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type RenameGroupMutationMutation = { __typename?: 'Mutation', renameGroup: boolean };

export type AddMembersToGroupMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  targetUserIds: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type AddMembersToGroupMutation = { __typename?: 'Mutation', addMembersToGroup: boolean };

export type RemoveMemberFromGroupMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
}>;


export type RemoveMemberFromGroupMutation = { __typename?: 'Mutation', removeMemberFromGroup: boolean };

export type LeaveGroupMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leaveGroup: boolean };

export type MakeGroupAdminMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
}>;


export type MakeGroupAdminMutation = { __typename?: 'Mutation', makeGroupAdmin: boolean };

export type RemoveGroupAdminMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
}>;


export type RemoveGroupAdminMutation = { __typename?: 'Mutation', removeGroupAdmin: boolean };

export type SeenByMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  messageIds: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type SeenByMutation = { __typename?: 'Mutation', seenBy: boolean };

export type SetNotificationsAsSeenMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type SetNotificationsAsSeenMutationMutation = { __typename?: 'Mutation', setNotificationsAsSeen: boolean };

export type LikeTweetMutationMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type LikeTweetMutationMutation = { __typename?: 'Mutation', likeTweet?: boolean | null };

export type DislikeTweetMutationMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type DislikeTweetMutationMutation = { __typename?: 'Mutation', dislikeTweet?: boolean | null };

export type CreateCommentMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', updateComment: boolean };

export type DeleteCommentMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type LikeCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type LikeCommentMutation = { __typename?: 'Mutation', likeComment: boolean };

export type DislikeCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type DislikeCommentMutation = { __typename?: 'Mutation', dislikeComment: boolean };

export type CreateReplyMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: boolean };

export type CreateBookmarkMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: boolean };

export type RemoveBookmarkMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark: boolean };

export type CreateTweetMutationVariables = Exact<{
  payload: TweetInput;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet: boolean };

export type DeleteTweetMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
}>;


export type DeleteTweetMutation = { __typename?: 'Mutation', deleteTweet: boolean };

export type UpdateTweetMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
  payload: TweetInput;
}>;


export type UpdateTweetMutation = { __typename?: 'Mutation', updateTweet: boolean };

export type CreateUserWithEmailAndPasswordMutationMutationVariables = Exact<{
  user: SignUpFormInput;
}>;


export type CreateUserWithEmailAndPasswordMutationMutation = { __typename?: 'Mutation', createUserWithEmailAndPassword?: boolean | null };

export type FollowUserMutationMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type FollowUserMutationMutation = { __typename?: 'Mutation', followUser?: boolean | null };

export type UnfollowUserMutationMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type UnfollowUserMutationMutation = { __typename?: 'Mutation', unfollowUser?: boolean | null };

export type RemoveFollowerMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type RemoveFollowerMutation = { __typename?: 'Mutation', removeFollower?: boolean | null };

export type GetTokensQueryQueryVariables = Exact<{
  googleToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SignInFormInput>;
}>;


export type GetTokensQueryQuery = { __typename?: 'Query', getTokens: boolean };

export type VerifyRefreshTokenQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifyRefreshTokenQueryQuery = { __typename?: 'Query', verifyRefreshToken: boolean };

export type GetChatsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQueryQuery = { __typename?: 'Query', getChats?: Array<{ __typename?: 'Chat', id: string, name?: string | null, isGroupChat?: boolean | null, totalMembersCount?: number | null, createdAt?: string | null, unseenMessagesCount?: number | null, creator?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, members?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null, lastSeenAt?: string | null } | null> | null, latestMessage?: { __typename?: 'Message', content?: string | null, createdAt?: string | null, sender?: { __typename?: 'User', firstName: string, username: string, profileImageURL?: string | null } | null } | null } | null> | null };

export type GetChatQueryQueryVariables = Exact<{
  targetUserId: Scalars['String']['input'];
}>;


export type GetChatQueryQuery = { __typename?: 'Query', getChat?: { __typename?: 'Chat', id: string, createdAt?: string | null, unseenMessagesCount?: number | null, creator?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string } | null } | null };

export type GetChatHistoryQueryQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type GetChatHistoryQueryQuery = { __typename?: 'Query', getChatHistory?: Array<{ __typename?: 'ChatHistory', date: string, messages?: { __typename?: 'Messages', unseenMessages?: Array<{ __typename?: 'Message', id: string, content?: string | null, createdAt?: string | null, sender?: { __typename?: 'User', id: string, username: string, profileImageURL?: string | null } | null } | null> | null, seenMessages?: Array<{ __typename?: 'Message', id: string, content?: string | null, createdAt?: string | null, sender?: { __typename?: 'User', id: string, username: string, profileImageURL?: string | null } | null } | null> | null, sessionUserMessages?: Array<{ __typename?: 'Message', id: string, content?: string | null, createdAt?: string | null, sender?: { __typename?: 'User', id: string, username: string, profileImageURL?: string | null } | null, seenBy?: Array<{ __typename?: 'User', id: string } | null> | null } | null> | null } | null, activities?: Array<{ __typename?: 'ChatActivity', id: string, type?: ChatActivityType | null, createdAt?: string | null, metaData?: { __typename?: 'ChatActivityMetaData', chatName?: string | null } | null, user?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string } | null, targetUser?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string } | null } | null> | null } | null> | null };

export type GetChatMembersQueryQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type GetChatMembersQueryQuery = { __typename?: 'Query', getChatMembers: Array<{ __typename?: 'ChatMembership', role?: ChatMemberRole | null, user?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null } | null> };

export type GetAvailableMembersQueryQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
  searchText: Scalars['String']['input'];
}>;


export type GetAvailableMembersQueryQuery = { __typename?: 'Query', getAvailableMembers: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null> };

export type GetUnseenChatsCountQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnseenChatsCountQueryQuery = { __typename?: 'Query', getUnseenChatsCount: number };

export type GetPeopleWithMessageSeenQueryVariables = Exact<{
  messageId: Scalars['String']['input'];
}>;


export type GetPeopleWithMessageSeenQuery = { __typename?: 'Query', getPeopleWithMessageSeen: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null> };

export type GetUnseenNotificationsCountQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnseenNotificationsCountQueryQuery = { __typename?: 'Query', getUnseenNotificationsCount?: number | null };

export type GetAllNotificationsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNotificationsQueryQuery = { __typename?: 'Query', getAllNotifications: { __typename?: 'Notifications', seenNotifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, createdAt: string, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, username: string }, metaData?: { __typename?: 'MetaData', tweet?: { __typename?: 'Tweet', id: string, imageURL?: string | null } | null, comment?: { __typename?: 'Comment', content: string } | null, repliedComment?: { __typename?: 'Comment', content: string } | null } | null } | null>, unseenNotifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, createdAt: string, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, username: string }, metaData?: { __typename?: 'MetaData', tweet?: { __typename?: 'Tweet', id: string, imageURL?: string | null } | null, comment?: { __typename?: 'Comment', content: string } | null, repliedComment?: { __typename?: 'Comment', content: string } | null } | null } | null> } };

export type GetTweetEnagagementQueryQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetTweetEnagagementQueryQuery = { __typename?: 'Query', getTweet?: { __typename?: 'Tweet', tweetEngagement?: { __typename?: 'TweetEngagement', likesCount?: number | null, isTweetLikedBySessionUser?: boolean | null, commentsCount?: number | null, isTweetBookmarkedBySessionUser?: boolean | null } | null } | null };

export type GetLikedByQueryQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetLikedByQueryQuery = { __typename?: 'Query', getTweetEngagement?: { __typename?: 'TweetEngagement', likes?: Array<{ __typename?: 'User', username: string, profileImageURL?: string | null } | null> | null } | null };

export type GetDetailedLikedByQueryQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetDetailedLikedByQueryQuery = { __typename?: 'Query', getTweetEngagement?: { __typename?: 'TweetEngagement', likes?: Array<{ __typename?: 'User', username: string, profileImageURL?: string | null, firstName: string, lastName?: string | null, id: string } | null> | null } | null };

export type GetTweetCommentsQueryQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetTweetCommentsQueryQuery = { __typename?: 'Query', getTweet?: { __typename?: 'Tweet', tweetEngagement?: { __typename?: 'TweetEngagement', comments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: string, updatedAt: string, likesCount?: number | null, isCommentLikedBySessionUser?: boolean | null, commentsCount?: number | null, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null } | null> | null } | null } | null };

export type GetCommentsOfCommentQueryVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type GetCommentsOfCommentQuery = { __typename?: 'Query', getCommentsOfComment?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: string, updatedAt: string, likesCount?: number | null, isCommentLikedBySessionUser?: boolean | null, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null, repliedTo?: { __typename?: 'Comment', id: string, author?: { __typename?: 'User', username: string } | null } | null } | null> | null };

export type GetRepliedToCommentQueryVariables = Exact<{
  commentId: Scalars['String']['input'];
  tweetId: Scalars['String']['input'];
}>;


export type GetRepliedToCommentQuery = { __typename?: 'Query', getComment?: { __typename?: 'Comment', repliedTo?: { __typename?: 'Comment', content: string, createdAt: string, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null } | null } | null };

export type GetBookmarksQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksQueryQuery = { __typename?: 'Query', getBookmarks?: Array<{ __typename?: 'Tweet', id: string, content?: string | null, imageURL?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, tweetEngagement?: { __typename?: 'TweetEngagement', likesCount?: number | null, isTweetLikedBySessionUser?: boolean | null, commentsCount?: number | null, isTweetBookmarkedBySessionUser?: boolean | null } | null } | null> | null };

export type GetSignedUrlForUploadingImageQueryQueryVariables = Exact<{
  payload: ImageUploadInput;
}>;


export type GetSignedUrlForUploadingImageQueryQuery = { __typename?: 'Query', getSignedURLForUploadingImage: string };

export type GetTweetQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetTweetQuery = { __typename?: 'Query', getTweet?: { __typename?: 'Tweet', content?: string | null, id: string, imageURL?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null } | null };

export type GetPaginatedTweetsFeedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPaginatedTweetsFeedQuery = { __typename?: 'Query', getPaginatedTweetsFeed: { __typename?: 'PaginatedTweets', nextCursor?: string | null, tweets: Array<{ __typename?: 'Tweet', id: string, content?: string | null, imageURL?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, tweetEngagement?: { __typename?: 'TweetEngagement', likesCount?: number | null, isTweetLikedBySessionUser?: boolean | null, commentsCount?: number | null, isTweetBookmarkedBySessionUser?: boolean | null } | null } | null> } };

export type GetPaginatedUserTweetsQueryQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPaginatedUserTweetsQueryQuery = { __typename?: 'Query', getPaginatedTweets: { __typename?: 'PaginatedTweets', nextCursor?: string | null, tweets: Array<{ __typename?: 'Tweet', id: string, content?: string | null, imageURL?: string | null, createdAt: string, updatedAt: string, tweetEngagement?: { __typename?: 'TweetEngagement', likesCount?: number | null, isTweetLikedBySessionUser?: boolean | null, commentsCount?: number | null } | null } | null> } };

export type GetUserQueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, followersCount?: number | null, followingsCount?: number | null, createdAt?: string | null, tweetsCount?: number | null } | null };

export type GetSessionUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionUserQueryQuery = { __typename?: 'Query', getSessionUser?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null, email?: string | null } | null };

export type GetAllUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQueryQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null, email?: string | null, followers?: Array<{ __typename?: 'User', username: string } | null> | null } | null> | null };

export type GetUsersQueryQueryVariables = Exact<{
  searchText: Scalars['String']['input'];
}>;


export type GetUsersQueryQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null, email?: string | null } | null> | null };

export type IsUsernameExistQueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUsernameExistQueryQuery = { __typename?: 'Query', isUsernameExist?: boolean | null };

export type IsEmailExistQueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type IsEmailExistQueryQuery = { __typename?: 'Query', isEmailExist?: boolean | null };

export type GetFollowersQueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetFollowersQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', followers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, email?: string | null, profileImageURL?: string | null } | null> | null } | null };

export type GetFollowingsQueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetFollowingsQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', followings?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, email?: string | null, profileImageURL?: string | null } | null> | null } | null };

export type GetMutualUsersQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetMutualUsersQuery = { __typename?: 'Query', getMutualFollowers?: Array<{ __typename?: 'User', username: string, profileImageURL?: string | null } | null> | null };

export type GetIsFollowingQueryQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetIsFollowingQueryQuery = { __typename?: 'Query', isFollowing?: boolean | null };

export type GetRecommendedUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecommendedUsersQueryQuery = { __typename?: 'Query', getRecommendedUsers?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, email?: string | null, profileImageURL?: string | null } | null> | null };

export type GetUserLastSeenQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserLastSeenQuery = { __typename?: 'Query', getUserLastSeen?: string | null };


export const CreateGroupMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetUserIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetUserIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetUserIds"}}}]}]}}]} as unknown as DocumentNode<CreateGroupMutationMutation, CreateGroupMutationMutationVariables>;
export const RenameGroupMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameGroupMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renameGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<RenameGroupMutationMutation, RenameGroupMutationMutationVariables>;
export const AddMembersToGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMembersToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetUserIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMembersToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetUserIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetUserIds"}}}]}]}}]} as unknown as DocumentNode<AddMembersToGroupMutation, AddMembersToGroupMutationVariables>;
export const RemoveMemberFromGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMemberFromGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMemberFromGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}}}]}]}}]} as unknown as DocumentNode<RemoveMemberFromGroupMutation, RemoveMemberFromGroupMutationVariables>;
export const LeaveGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}]}]}}]} as unknown as DocumentNode<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const MakeGroupAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeGroupAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeGroupAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}}}]}]}}]} as unknown as DocumentNode<MakeGroupAdminMutation, MakeGroupAdminMutationVariables>;
export const RemoveGroupAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveGroupAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGroupAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}}}]}]}}]} as unknown as DocumentNode<RemoveGroupAdminMutation, RemoveGroupAdminMutationVariables>;
export const SeenByDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeenBy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seenBy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}]}]}}]} as unknown as DocumentNode<SeenByMutation, SeenByMutationVariables>;
export const SetNotificationsAsSeenMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setNotificationsAsSeenMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNotificationsAsSeen"}}]}}]} as unknown as DocumentNode<SetNotificationsAsSeenMutationMutation, SetNotificationsAsSeenMutationMutationVariables>;
export const LikeTweetMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeTweetMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<LikeTweetMutationMutation, LikeTweetMutationMutationVariables>;
export const DislikeTweetMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DislikeTweetMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<DislikeTweetMutationMutation, DislikeTweetMutationMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const EditCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<EditCommentMutation, EditCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const LikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<LikeCommentMutation, LikeCommentMutationVariables>;
export const DislikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DislikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DislikeCommentMutation, DislikeCommentMutationVariables>;
export const CreateReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<CreateReplyMutation, CreateReplyMutationVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const RemoveBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const CreateTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TweetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<CreateTweetMutation, CreateTweetMutationVariables>;
export const DeleteTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<DeleteTweetMutation, DeleteTweetMutationVariables>;
export const UpdateTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TweetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<UpdateTweetMutation, UpdateTweetMutationVariables>;
export const CreateUserWithEmailAndPasswordMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUserWithEmailAndPasswordMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpFormInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserWithEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<CreateUserWithEmailAndPasswordMutationMutation, CreateUserWithEmailAndPasswordMutationMutationVariables>;
export const FollowUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<FollowUserMutationMutation, FollowUserMutationMutationVariables>;
export const UnfollowUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnfollowUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<UnfollowUserMutationMutation, UnfollowUserMutationMutationVariables>;
export const RemoveFollowerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFollower"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFollower"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<RemoveFollowerMutation, RemoveFollowerMutationVariables>;
export const GetTokensQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokensQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"googleToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInFormInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"googleToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"googleToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<GetTokensQueryQuery, GetTokensQueryQueryVariables>;
export const VerifyRefreshTokenQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyRefreshTokenQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyRefreshToken"}}]}}]} as unknown as DocumentNode<VerifyRefreshTokenQueryQuery, VerifyRefreshTokenQueryQueryVariables>;
export const GetChatsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isGroupChat"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembersCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeenAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unseenMessagesCount"}}]}}]}}]} as unknown as DocumentNode<GetChatsQueryQuery, GetChatsQueryQueryVariables>;
export const GetChatQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unseenMessagesCount"}}]}}]}}]} as unknown as DocumentNode<GetChatQueryQuery, GetChatQueryQueryVariables>;
export const GetChatHistoryQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChatHistoryQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChatHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unseenMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seenMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sessionUserMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"seenBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"metaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatHistoryQueryQuery, GetChatHistoryQueryQueryVariables>;
export const GetChatMembersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChatMembersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChatMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetChatMembersQueryQuery, GetChatMembersQueryQueryVariables>;
export const GetAvailableMembersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAvailableMembersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAvailableMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetAvailableMembersQueryQuery, GetAvailableMembersQueryQueryVariables>;
export const GetUnseenChatsCountQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnseenChatsCountQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUnseenChatsCount"}}]}}]} as unknown as DocumentNode<GetUnseenChatsCountQueryQuery, GetUnseenChatsCountQueryQueryVariables>;
export const GetPeopleWithMessageSeenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPeopleWithMessageSeen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPeopleWithMessageSeen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetPeopleWithMessageSeenQuery, GetPeopleWithMessageSeenQueryVariables>;
export const GetUnseenNotificationsCountQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnseenNotificationsCountQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUnseenNotificationsCount"}}]}}]} as unknown as DocumentNode<GetUnseenNotificationsCountQueryQuery, GetUnseenNotificationsCountQueryQueryVariables>;
export const GetAllNotificationsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllNotificationsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seenNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliedComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unseenNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliedComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllNotificationsQueryQuery, GetAllNotificationsQueryQueryVariables>;
export const GetTweetEnagagementQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTweetEnagagementQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweetEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetBookmarkedBySessionUser"}}]}}]}}]}}]} as unknown as DocumentNode<GetTweetEnagagementQueryQuery, GetTweetEnagagementQueryQueryVariables>;
export const GetLikedByQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedByQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTweetEngagement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetLikedByQueryQuery, GetLikedByQueryQueryVariables>;
export const GetDetailedLikedByQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDetailedLikedByQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTweetEngagement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetDetailedLikedByQueryQuery, GetDetailedLikedByQueryQueryVariables>;
export const GetTweetCommentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTweetCommentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweetEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isCommentLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTweetCommentsQueryQuery, GetTweetCommentsQueryQueryVariables>;
export const GetCommentsOfCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCommentsOfComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCommentsOfComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isCommentLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsOfCommentQuery, GetCommentsOfCommentQueryVariables>;
export const GetRepliedToCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRepliedToComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repliedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepliedToCommentQuery, GetRepliedToCommentQueryVariables>;
export const GetBookmarksQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmarksQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweetEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetBookmarkedBySessionUser"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarksQueryQuery, GetBookmarksQueryQueryVariables>;
export const GetSignedUrlForUploadingImageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSignedURLForUploadingImageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"imageUploadInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignedURLForUploadingImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<GetSignedUrlForUploadingImageQueryQuery, GetSignedUrlForUploadingImageQueryQueryVariables>;
export const GetTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetTweetQuery, GetTweetQueryVariables>;
export const GetPaginatedTweetsFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedTweetsFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedTweetsFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweetEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetBookmarkedBySessionUser"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<GetPaginatedTweetsFeedQuery, GetPaginatedTweetsFeedQueryVariables>;
export const GetPaginatedUserTweetsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedUserTweetsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedTweets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"tweetEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isTweetLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<GetPaginatedUserTweetsQueryQuery, GetPaginatedUserTweetsQueryQueryVariables>;
export const GetUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tweetsCount"}}]}}]}}]} as unknown as DocumentNode<GetUserQueryQuery, GetUserQueryQueryVariables>;
export const GetSessionUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSessionUserQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSessionUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetSessionUserQueryQuery, GetSessionUserQueryQueryVariables>;
export const GetAllUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQueryQuery, GetAllUsersQueryQueryVariables>;
export const GetUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUsersQueryQuery, GetUsersQueryQueryVariables>;
export const IsUsernameExistQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUsernameExistQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUsernameExist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUsernameExistQueryQuery, IsUsernameExistQueryQueryVariables>;
export const IsEmailExistQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailExistQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailExist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<IsEmailExistQueryQuery, IsEmailExistQueryQueryVariables>;
export const GetFollowersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowersQueryQuery, GetFollowersQueryQueryVariables>;
export const GetFollowingsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowingsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowingsQueryQuery, GetFollowingsQueryQueryVariables>;
export const GetMutualUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMutualUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMutualFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetMutualUsersQuery, GetMutualUsersQueryVariables>;
export const GetIsFollowingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIsFollowingQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<GetIsFollowingQueryQuery, GetIsFollowingQueryQueryVariables>;
export const GetRecommendedUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecommendedUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRecommendedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetRecommendedUsersQueryQuery, GetRecommendedUsersQueryQueryVariables>;
export const GetUserLastSeenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserLastSeen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserLastSeen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<GetUserLastSeenQuery, GetUserLastSeenQueryVariables>;