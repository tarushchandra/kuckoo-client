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
  post?: Maybe<Post>;
  repliedComment?: Maybe<Comment>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMembersToGroup: Scalars['Boolean']['output'];
  createBookmark: Scalars['Boolean']['output'];
  createComment: Scalars['Boolean']['output'];
  createGroup: Scalars['Boolean']['output'];
  createPost: Scalars['Boolean']['output'];
  createReply: Scalars['Boolean']['output'];
  createUserWithEmailAndPassword?: Maybe<Scalars['Boolean']['output']>;
  deleteComment: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  dislikeComment: Scalars['Boolean']['output'];
  dislikePost?: Maybe<Scalars['Boolean']['output']>;
  followUser?: Maybe<Scalars['Boolean']['output']>;
  leaveGroup: Scalars['Boolean']['output'];
  likeComment: Scalars['Boolean']['output'];
  likePost?: Maybe<Scalars['Boolean']['output']>;
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
  updatePost: Scalars['Boolean']['output'];
};


export type MutationAddMembersToGroupArgs = {
  chatId: Scalars['String']['input'];
  targetUserIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreateBookmarkArgs = {
  postId: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};


export type MutationCreateGroupArgs = {
  name: Scalars['String']['input'];
  targetUserIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreatePostArgs = {
  payload: PostInput;
};


export type MutationCreateReplyArgs = {
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};


export type MutationCreateUserWithEmailAndPasswordArgs = {
  user: SignUpFormInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationDislikeCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDislikePostArgs = {
  postId: Scalars['String']['input'];
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


export type MutationLikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationMakeGroupAdminArgs = {
  chatId: Scalars['String']['input'];
  targetUserId: Scalars['String']['input'];
};


export type MutationRemoveBookmarkArgs = {
  postId: Scalars['String']['input'];
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


export type MutationUpdatePostArgs = {
  payload: PostInput;
  postId: Scalars['ID']['input'];
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
  CommentOnPost = 'COMMENT_ON_POST',
  Follow = 'FOLLOW',
  LikeOnComment = 'LIKE_ON_COMMENT',
  LikeOnPost = 'LIKE_ON_POST',
  ReplyOnComment = 'REPLY_ON_COMMENT'
}

export type Notifications = {
  __typename?: 'Notifications';
  seenNotifications: Array<Maybe<Notification>>;
  unseenNotifications: Array<Maybe<Notification>>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  nextCursor?: Maybe<Scalars['String']['output']>;
  posts: Array<Maybe<Post>>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  postEngagement?: Maybe<PostEngagement>;
  updatedAt: Scalars['String']['output'];
};

export type PostEngagement = {
  __typename?: 'PostEngagement';
  comments?: Maybe<Array<Maybe<Comment>>>;
  commentsCount?: Maybe<Scalars['Int']['output']>;
  isPostBookmarkedBySessionUser?: Maybe<Scalars['Boolean']['output']>;
  isPostLikedBySessionUser?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Array<Maybe<User>>>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  shares?: Maybe<Scalars['Int']['output']>;
};

export type PostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  imagePathname?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllNotifications: Notifications;
  getAllPosts?: Maybe<Array<Maybe<Post>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getAvailableMembers: Array<Maybe<User>>;
  getBookmarks?: Maybe<Array<Maybe<Post>>>;
  getChat?: Maybe<Chat>;
  getChatHistory?: Maybe<Array<Maybe<ChatHistory>>>;
  getChatMembers: Array<Maybe<ChatMembership>>;
  getChats?: Maybe<Array<Maybe<Chat>>>;
  getComment?: Maybe<Comment>;
  getCommentsOfComment?: Maybe<Array<Maybe<Comment>>>;
  getMutualFollowers?: Maybe<Array<Maybe<User>>>;
  getMutualLikers?: Maybe<Array<Maybe<User>>>;
  getPaginatedPosts: PaginatedPosts;
  getPaginatedPostsFeed: PaginatedPosts;
  getPeopleWithMessageSeen: Array<Maybe<User>>;
  getPost?: Maybe<Post>;
  getPostEngagement?: Maybe<PostEngagement>;
  getRecommendedUsers?: Maybe<Array<Maybe<User>>>;
  getSessionUser?: Maybe<User>;
  getSignedURLForUploadingImage: Scalars['String']['output'];
  getTokens: Scalars['Boolean']['output'];
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
  postId: Scalars['String']['input'];
};


export type QueryGetCommentsOfCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type QueryGetMutualFollowersArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetMutualLikersArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetPaginatedPostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetPaginatedPostsFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryGetPeopleWithMessageSeenArgs = {
  messageId: Scalars['String']['input'];
};


export type QueryGetPostArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetPostEngagementArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetSignedUrlForUploadingImageArgs = {
  payload: ImageUploadInput;
};


export type QueryGetTokensArgs = {
  googleToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SignInFormInput>;
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
  postsCount?: Maybe<Scalars['Int']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
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

export type LikePostMutationMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type LikePostMutationMutation = { __typename?: 'Mutation', likePost?: boolean | null };

export type DislikePostMutationMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DislikePostMutationMutation = { __typename?: 'Mutation', dislikePost?: boolean | null };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', updateComment: boolean };

export type DeleteCommentMutationVariables = Exact<{
  postId: Scalars['String']['input'];
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
  postId: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: boolean };

export type CreateBookmarkMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: boolean };

export type RemoveBookmarkMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark: boolean };

export type CreatePostMutationVariables = Exact<{
  payload: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  payload: PostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: boolean };

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


export type GetAllNotificationsQueryQuery = { __typename?: 'Query', getAllNotifications: { __typename?: 'Notifications', seenNotifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, createdAt: string, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, username: string }, metaData?: { __typename?: 'MetaData', post?: { __typename?: 'Post', id: string, imageURL?: string | null } | null, comment?: { __typename?: 'Comment', content: string } | null, repliedComment?: { __typename?: 'Comment', content: string } | null } | null } | null>, unseenNotifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, createdAt: string, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, username: string }, metaData?: { __typename?: 'MetaData', post?: { __typename?: 'Post', id: string, imageURL?: string | null } | null, comment?: { __typename?: 'Comment', content: string } | null, repliedComment?: { __typename?: 'Comment', content: string } | null } | null } | null> } };

export type GetPostEnagagementQueryQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetPostEnagagementQueryQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', postEngagement?: { __typename?: 'PostEngagement', likesCount?: number | null, isPostLikedBySessionUser?: boolean | null, commentsCount?: number | null, isPostBookmarkedBySessionUser?: boolean | null } | null } | null };

export type GetLikedByQueryQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetLikedByQueryQuery = { __typename?: 'Query', getPostEngagement?: { __typename?: 'PostEngagement', likes?: Array<{ __typename?: 'User', username: string, profileImageURL?: string | null } | null> | null } | null };

export type GetDetailedLikedByQueryQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetDetailedLikedByQueryQuery = { __typename?: 'Query', getPostEngagement?: { __typename?: 'PostEngagement', likes?: Array<{ __typename?: 'User', username: string, profileImageURL?: string | null, firstName: string, lastName?: string | null, id: string } | null> | null } | null };

export type GetPostCommentsQueryQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetPostCommentsQueryQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', postEngagement?: { __typename?: 'PostEngagement', comments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: string, updatedAt: string, likesCount?: number | null, isCommentLikedBySessionUser?: boolean | null, commentsCount?: number | null, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null } | null> | null } | null } | null };

export type GetCommentsOfCommentQueryVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type GetCommentsOfCommentQuery = { __typename?: 'Query', getCommentsOfComment?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: string, updatedAt: string, likesCount?: number | null, isCommentLikedBySessionUser?: boolean | null, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null, repliedTo?: { __typename?: 'Comment', id: string, author?: { __typename?: 'User', username: string } | null } | null } | null> | null };

export type GetRepliedToCommentQueryVariables = Exact<{
  commentId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
}>;


export type GetRepliedToCommentQuery = { __typename?: 'Query', getComment?: { __typename?: 'Comment', repliedTo?: { __typename?: 'Comment', content: string, createdAt: string, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null } | null } | null };

export type GetBookmarksQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksQueryQuery = { __typename?: 'Query', getBookmarks?: Array<{ __typename?: 'Post', id: string, content?: string | null, imageURL?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, postEngagement?: { __typename?: 'PostEngagement', likesCount?: number | null, isPostLikedBySessionUser?: boolean | null, commentsCount?: number | null, isPostBookmarkedBySessionUser?: boolean | null } | null } | null> | null };

export type GetSignedUrlForUploadingImageQueryQueryVariables = Exact<{
  payload: ImageUploadInput;
}>;


export type GetSignedUrlForUploadingImageQueryQuery = { __typename?: 'Query', getSignedURLForUploadingImage: string };

export type GetPostQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', content?: string | null, id: string, imageURL?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null } | null };

export type GetPaginatedPostsFeedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPaginatedPostsFeedQuery = { __typename?: 'Query', getPaginatedPostsFeed: { __typename?: 'PaginatedPosts', nextCursor?: string | null, posts: Array<{ __typename?: 'Post', id: string, content?: string | null, imageURL?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null } | null, postEngagement?: { __typename?: 'PostEngagement', likesCount?: number | null, isPostLikedBySessionUser?: boolean | null, commentsCount?: number | null, isPostBookmarkedBySessionUser?: boolean | null } | null } | null> } };

export type GetPaginatedUserPostsQueryQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPaginatedUserPostsQueryQuery = { __typename?: 'Query', getPaginatedPosts: { __typename?: 'PaginatedPosts', nextCursor?: string | null, posts: Array<{ __typename?: 'Post', id: string, content?: string | null, imageURL?: string | null, createdAt: string, updatedAt: string, postEngagement?: { __typename?: 'PostEngagement', likesCount?: number | null, isPostLikedBySessionUser?: boolean | null, commentsCount?: number | null } | null } | null> } };

export type GetUserQueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, followersCount?: number | null, followingsCount?: number | null, createdAt?: string | null, postsCount?: number | null } | null };

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
export const LikePostMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePostMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<LikePostMutationMutation, LikePostMutationMutationVariables>;
export const DislikePostMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DislikePostMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<DislikePostMutationMutation, DislikePostMutationMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const EditCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<EditCommentMutation, EditCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const LikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<LikeCommentMutation, LikeCommentMutationVariables>;
export const DislikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DislikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DislikeCommentMutation, DislikeCommentMutationVariables>;
export const CreateReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<CreateReplyMutation, CreateReplyMutationVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const RemoveBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
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
export const GetAllNotificationsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllNotificationsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seenNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliedComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unseenNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliedComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllNotificationsQueryQuery, GetAllNotificationsQueryQueryVariables>;
export const GetPostEnagagementQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostEnagagementQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostBookmarkedBySessionUser"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostEnagagementQueryQuery, GetPostEnagagementQueryQueryVariables>;
export const GetLikedByQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedByQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostEngagement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetLikedByQueryQuery, GetLikedByQueryQueryVariables>;
export const GetDetailedLikedByQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDetailedLikedByQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostEngagement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetDetailedLikedByQueryQuery, GetDetailedLikedByQueryQueryVariables>;
export const GetPostCommentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostCommentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isCommentLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostCommentsQueryQuery, GetPostCommentsQueryQueryVariables>;
export const GetCommentsOfCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCommentsOfComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCommentsOfComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isCommentLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsOfCommentQuery, GetCommentsOfCommentQueryVariables>;
export const GetRepliedToCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRepliedToComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repliedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepliedToCommentQuery, GetRepliedToCommentQueryVariables>;
export const GetBookmarksQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmarksQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"postEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostBookmarkedBySessionUser"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarksQueryQuery, GetBookmarksQueryQueryVariables>;
export const GetSignedUrlForUploadingImageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSignedURLForUploadingImageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"imageUploadInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignedURLForUploadingImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<GetSignedUrlForUploadingImageQueryQuery, GetSignedUrlForUploadingImageQueryQueryVariables>;
export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;
export const GetPaginatedPostsFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedPostsFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedPostsFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"postEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostBookmarkedBySessionUser"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<GetPaginatedPostsFeedQuery, GetPaginatedPostsFeedQueryVariables>;
export const GetPaginatedUserPostsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedUserPostsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"postEngagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPostLikedBySessionUser"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<GetPaginatedUserPostsQueryQuery, GetPaginatedUserPostsQueryQueryVariables>;
export const GetUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"postsCount"}}]}}]}}]} as unknown as DocumentNode<GetUserQueryQuery, GetUserQueryQueryVariables>;
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