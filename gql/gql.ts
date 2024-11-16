/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateGroupMutation($name: String!, $targetUserIds: [String]!) {\n    createGroup(name: $name, targetUserIds: $targetUserIds)\n  }\n": types.CreateGroupMutationDocument,
    "\n  mutation RenameGroupMutation($chatId: String!, $name: String!) {\n    renameGroup(chatId: $chatId, name: $name)\n  }\n": types.RenameGroupMutationDocument,
    "\n  mutation AddMembersToGroup($chatId: String!, $targetUserIds: [String]!) {\n    addMembersToGroup(chatId: $chatId, targetUserIds: $targetUserIds)\n  }\n": types.AddMembersToGroupDocument,
    "\n  mutation RemoveMemberFromGroup($chatId: String!, $targetUserId: String!) {\n    removeMemberFromGroup(chatId: $chatId, targetUserId: $targetUserId)\n  }\n": types.RemoveMemberFromGroupDocument,
    "\n  mutation LeaveGroup($chatId: String!) {\n    leaveGroup(chatId: $chatId)\n  }\n": types.LeaveGroupDocument,
    "\n  mutation MakeGroupAdmin($chatId: String!, $targetUserId: String!) {\n    makeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)\n  }\n": types.MakeGroupAdminDocument,
    "\n  mutation RemoveGroupAdmin($chatId: String!, $targetUserId: String!) {\n    removeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)\n  }\n": types.RemoveGroupAdminDocument,
    "\n  mutation SeenBy($chatId: String!, $messageIds: [String]!) {\n    seenBy(chatId: $chatId, messageIds: $messageIds)\n  }\n": types.SeenByDocument,
    "\n  mutation setNotificationsAsSeenMutation {\n    setNotificationsAsSeen\n  }\n": types.SetNotificationsAsSeenMutationDocument,
    "\n  mutation LikeTweetMutation($tweetId: String!) {\n    likeTweet(tweetId: $tweetId)\n  }\n": types.LikeTweetMutationDocument,
    "\n  mutation DislikeTweetMutation($tweetId: String!) {\n    dislikeTweet(tweetId: $tweetId)\n  }\n": types.DislikeTweetMutationDocument,
    "\n  mutation CreateComment($tweetId: String!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content)\n  }\n": types.CreateCommentDocument,
    "\n  mutation EditComment($commentId: String!, $content: String!) {\n    updateComment(commentId: $commentId, content: $content)\n  }\n": types.EditCommentDocument,
    "\n  mutation DeleteComment($tweetId: String!, $commentId: String!) {\n    deleteComment(tweetId: $tweetId, commentId: $commentId)\n  }\n": types.DeleteCommentDocument,
    "\n  mutation LikeComment($commentId: String!) {\n    likeComment(commentId: $commentId)\n  }\n": types.LikeCommentDocument,
    "\n  mutation DislikeComment($commentId: String!) {\n    dislikeComment(commentId: $commentId)\n  }\n": types.DislikeCommentDocument,
    "\n  mutation CreateReply(\n    $tweetId: String!\n    $commentId: String!\n    $content: String!\n  ) {\n    createReply(tweetId: $tweetId, commentId: $commentId, content: $content)\n  }\n": types.CreateReplyDocument,
    "\n  mutation CreateBookmark($tweetId: String!) {\n    createBookmark(tweetId: $tweetId)\n  }\n": types.CreateBookmarkDocument,
    "\n  mutation RemoveBookmark($tweetId: String!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n": types.RemoveBookmarkDocument,
    "\n  mutation CreateTweet($payload: TweetInput!) {\n    createTweet(payload: $payload)\n  }\n": types.CreateTweetDocument,
    "\n  mutation DeleteTweet($tweetId: ID!) {\n    deleteTweet(tweetId: $tweetId)\n  }\n": types.DeleteTweetDocument,
    "\n  mutation UpdateTweet($tweetId: ID!, $payload: TweetInput!) {\n    updateTweet(tweetId: $tweetId, payload: $payload)\n  }\n": types.UpdateTweetDocument,
    "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n": types.CreateUserWithEmailAndPasswordMutationDocument,
    "\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserMutationDocument,
    "\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserMutationDocument,
    "\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n": types.RemoveFollowerDocument,
    "\n  query GetChatsQuery {\n    getChats {\n      id\n      name\n      isGroupChat\n      totalMembersCount\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      members {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n        lastSeenAt\n      }\n      latestMessage {\n        content\n        sender {\n          firstName\n          username\n          profileImageURL\n        }\n        createdAt\n      }\n      unseenMessagesCount\n    }\n  }\n": types.GetChatsQueryDocument,
    "\n  query GetChatQuery($targetUserId: String!) {\n    getChat(targetUserId: $targetUserId) {\n      id\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n      }\n      unseenMessagesCount\n    }\n  }\n": types.GetChatQueryDocument,
    "\n  query getChatHistoryQuery($chatId: String!) {\n    getChatHistory(chatId: $chatId) {\n      date\n      messages {\n        unseenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        seenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        sessionUserMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n          seenBy {\n            id\n          }\n        }\n      }\n      activities {\n        id\n        type\n        metaData {\n          chatName\n        }\n        user {\n          firstName\n          lastName\n          username\n        }\n        targetUser {\n          firstName\n          lastName\n          username\n        }\n        createdAt\n      }\n    }\n  }\n": types.GetChatHistoryQueryDocument,
    "\n  query getChatMembersQuery($chatId: String!) {\n    getChatMembers(chatId: $chatId) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      role\n    }\n  }\n": types.GetChatMembersQueryDocument,
    "\n  query getAvailableMembersQuery($chatId: String!, $searchText: String!) {\n    getAvailableMembers(chatId: $chatId, searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n": types.GetAvailableMembersQueryDocument,
    "\n  query GetUnseenChatsCountQuery {\n    getUnseenChatsCount\n  }\n": types.GetUnseenChatsCountQueryDocument,
    "\n  query GetPeopleWithMessageSeen($messageId: String!) {\n    getPeopleWithMessageSeen(messageId: $messageId) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n": types.GetPeopleWithMessageSeenDocument,
    "\n  query GetUnseenNotificationsCountQuery {\n    getUnseenNotificationsCount\n  }\n": types.GetUnseenNotificationsCountQueryDocument,
    "\n  query GetAllNotificationsQuery {\n    getAllNotifications {\n      seenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          tweet {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n\n      unseenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          tweet {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n    }\n  }\n": types.GetAllNotificationsQueryDocument,
    "\n  query GetTweetEnagagementQuery($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n": types.GetTweetEnagagementQueryDocument,
    "\n  query GetLikedByQuery($tweetId: String!) {\n    getTweetEngagement(tweetId: $tweetId) {\n      likes {\n        username\n        profileImageURL\n      }\n    }\n  }\n": types.GetLikedByQueryDocument,
    "\n  query GetDetailedLikedByQuery($tweetId: String!) {\n    getTweetEngagement(tweetId: $tweetId) {\n      likes {\n        username\n        profileImageURL\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n": types.GetDetailedLikedByQueryDocument,
    "\n  query GetTweetCommentsQuery($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      tweetEngagement {\n        comments {\n          id\n          content\n          createdAt\n          updatedAt\n          likesCount\n          isCommentLikedBySessionUser\n          author {\n            firstName\n            lastName\n            username\n            profileImageURL\n          }\n\n          commentsCount\n          parentComment {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.GetTweetCommentsQueryDocument,
    "\n  query GetCommentsOfComment($commentId: String!) {\n    getCommentsOfComment(commentId: $commentId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n\n      likesCount\n      isCommentLikedBySessionUser\n\n      parentComment {\n        id\n      }\n\n      repliedTo {\n        id\n        author {\n          username\n        }\n      }\n    }\n  }\n": types.GetCommentsOfCommentDocument,
    "\n  query getRepliedToComment($commentId: String!, $tweetId: String!) {\n    getComment(commentId: $commentId, tweetId: $tweetId) {\n      repliedTo {\n        content\n        createdAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetRepliedToCommentDocument,
    "\n  query GetBookmarksQuery {\n    getBookmarks {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n": types.GetBookmarksQueryDocument,
    "\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n": types.GetSignedUrlForUploadingImageQueryDocument,
    "\n  query GetTweet($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      content\n      id\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n": types.GetTweetDocument,
    "\n  query GetTweetsFeed {\n    getTweetsFeed {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n": types.GetTweetsFeedDocument,
    "\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n": types.GetCustomUserTokenQueryDocument,
    "\n  query GetUserQuery($username: String) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      tweetsCount\n    }\n  }\n": types.GetUserQueryDocument,
    "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetSessionUserQueryDocument,
    "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n": types.GetAllUsersQueryDocument,
    "\n  query GetUsersQuery($searchText: String!) {\n    getUsers(searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetUsersQueryDocument,
    "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n": types.IsUsernameExistQueryDocument,
    "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n": types.IsEmailExistQueryDocument,
    "\n  query GetFollowersQuery($username: String) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n": types.GetFollowersQueryDocument,
    "\n  query GetFollowingsQuery($username: String) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n": types.GetFollowingsQueryDocument,
    "\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n": types.GetMutualUsersDocument,
    "\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n": types.GetIsFollowingQueryDocument,
    "\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n": types.GetRecommendedUsersQueryDocument,
    "\n  query GetUserTweetsQuery($username: String) {\n    getUser(username: $username) {\n      tweets {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        tweetEngagement {\n          likesCount\n          isTweetLikedBySessionUser\n          commentsCount\n        }\n      }\n    }\n  }\n": types.GetUserTweetsQueryDocument,
    "\n  query getUserLastSeen($userId: String!) {\n    getUserLastSeen(userId: $userId)\n  }\n": types.GetUserLastSeenDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGroupMutation($name: String!, $targetUserIds: [String]!) {\n    createGroup(name: $name, targetUserIds: $targetUserIds)\n  }\n"): (typeof documents)["\n  mutation CreateGroupMutation($name: String!, $targetUserIds: [String]!) {\n    createGroup(name: $name, targetUserIds: $targetUserIds)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RenameGroupMutation($chatId: String!, $name: String!) {\n    renameGroup(chatId: $chatId, name: $name)\n  }\n"): (typeof documents)["\n  mutation RenameGroupMutation($chatId: String!, $name: String!) {\n    renameGroup(chatId: $chatId, name: $name)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMembersToGroup($chatId: String!, $targetUserIds: [String]!) {\n    addMembersToGroup(chatId: $chatId, targetUserIds: $targetUserIds)\n  }\n"): (typeof documents)["\n  mutation AddMembersToGroup($chatId: String!, $targetUserIds: [String]!) {\n    addMembersToGroup(chatId: $chatId, targetUserIds: $targetUserIds)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveMemberFromGroup($chatId: String!, $targetUserId: String!) {\n    removeMemberFromGroup(chatId: $chatId, targetUserId: $targetUserId)\n  }\n"): (typeof documents)["\n  mutation RemoveMemberFromGroup($chatId: String!, $targetUserId: String!) {\n    removeMemberFromGroup(chatId: $chatId, targetUserId: $targetUserId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeaveGroup($chatId: String!) {\n    leaveGroup(chatId: $chatId)\n  }\n"): (typeof documents)["\n  mutation LeaveGroup($chatId: String!) {\n    leaveGroup(chatId: $chatId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MakeGroupAdmin($chatId: String!, $targetUserId: String!) {\n    makeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)\n  }\n"): (typeof documents)["\n  mutation MakeGroupAdmin($chatId: String!, $targetUserId: String!) {\n    makeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveGroupAdmin($chatId: String!, $targetUserId: String!) {\n    removeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)\n  }\n"): (typeof documents)["\n  mutation RemoveGroupAdmin($chatId: String!, $targetUserId: String!) {\n    removeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SeenBy($chatId: String!, $messageIds: [String]!) {\n    seenBy(chatId: $chatId, messageIds: $messageIds)\n  }\n"): (typeof documents)["\n  mutation SeenBy($chatId: String!, $messageIds: [String]!) {\n    seenBy(chatId: $chatId, messageIds: $messageIds)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation setNotificationsAsSeenMutation {\n    setNotificationsAsSeen\n  }\n"): (typeof documents)["\n  mutation setNotificationsAsSeenMutation {\n    setNotificationsAsSeen\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeTweetMutation($tweetId: String!) {\n    likeTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation LikeTweetMutation($tweetId: String!) {\n    likeTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DislikeTweetMutation($tweetId: String!) {\n    dislikeTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation DislikeTweetMutation($tweetId: String!) {\n    dislikeTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($tweetId: String!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content)\n  }\n"): (typeof documents)["\n  mutation CreateComment($tweetId: String!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditComment($commentId: String!, $content: String!) {\n    updateComment(commentId: $commentId, content: $content)\n  }\n"): (typeof documents)["\n  mutation EditComment($commentId: String!, $content: String!) {\n    updateComment(commentId: $commentId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComment($tweetId: String!, $commentId: String!) {\n    deleteComment(tweetId: $tweetId, commentId: $commentId)\n  }\n"): (typeof documents)["\n  mutation DeleteComment($tweetId: String!, $commentId: String!) {\n    deleteComment(tweetId: $tweetId, commentId: $commentId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeComment($commentId: String!) {\n    likeComment(commentId: $commentId)\n  }\n"): (typeof documents)["\n  mutation LikeComment($commentId: String!) {\n    likeComment(commentId: $commentId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DislikeComment($commentId: String!) {\n    dislikeComment(commentId: $commentId)\n  }\n"): (typeof documents)["\n  mutation DislikeComment($commentId: String!) {\n    dislikeComment(commentId: $commentId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReply(\n    $tweetId: String!\n    $commentId: String!\n    $content: String!\n  ) {\n    createReply(tweetId: $tweetId, commentId: $commentId, content: $content)\n  }\n"): (typeof documents)["\n  mutation CreateReply(\n    $tweetId: String!\n    $commentId: String!\n    $content: String!\n  ) {\n    createReply(tweetId: $tweetId, commentId: $commentId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBookmark($tweetId: String!) {\n    createBookmark(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation CreateBookmark($tweetId: String!) {\n    createBookmark(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveBookmark($tweetId: String!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation RemoveBookmark($tweetId: String!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTweet($payload: TweetInput!) {\n    createTweet(payload: $payload)\n  }\n"): (typeof documents)["\n  mutation CreateTweet($payload: TweetInput!) {\n    createTweet(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTweet($tweetId: ID!) {\n    deleteTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation DeleteTweet($tweetId: ID!) {\n    deleteTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTweet($tweetId: ID!, $payload: TweetInput!) {\n    updateTweet(tweetId: $tweetId, payload: $payload)\n  }\n"): (typeof documents)["\n  mutation UpdateTweet($tweetId: ID!, $payload: TweetInput!) {\n    updateTweet(tweetId: $tweetId, payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n"): (typeof documents)["\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatsQuery {\n    getChats {\n      id\n      name\n      isGroupChat\n      totalMembersCount\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      members {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n        lastSeenAt\n      }\n      latestMessage {\n        content\n        sender {\n          firstName\n          username\n          profileImageURL\n        }\n        createdAt\n      }\n      unseenMessagesCount\n    }\n  }\n"): (typeof documents)["\n  query GetChatsQuery {\n    getChats {\n      id\n      name\n      isGroupChat\n      totalMembersCount\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      members {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n        lastSeenAt\n      }\n      latestMessage {\n        content\n        sender {\n          firstName\n          username\n          profileImageURL\n        }\n        createdAt\n      }\n      unseenMessagesCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatQuery($targetUserId: String!) {\n    getChat(targetUserId: $targetUserId) {\n      id\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n      }\n      unseenMessagesCount\n    }\n  }\n"): (typeof documents)["\n  query GetChatQuery($targetUserId: String!) {\n    getChat(targetUserId: $targetUserId) {\n      id\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n      }\n      unseenMessagesCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getChatHistoryQuery($chatId: String!) {\n    getChatHistory(chatId: $chatId) {\n      date\n      messages {\n        unseenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        seenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        sessionUserMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n          seenBy {\n            id\n          }\n        }\n      }\n      activities {\n        id\n        type\n        metaData {\n          chatName\n        }\n        user {\n          firstName\n          lastName\n          username\n        }\n        targetUser {\n          firstName\n          lastName\n          username\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query getChatHistoryQuery($chatId: String!) {\n    getChatHistory(chatId: $chatId) {\n      date\n      messages {\n        unseenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        seenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        sessionUserMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n          seenBy {\n            id\n          }\n        }\n      }\n      activities {\n        id\n        type\n        metaData {\n          chatName\n        }\n        user {\n          firstName\n          lastName\n          username\n        }\n        targetUser {\n          firstName\n          lastName\n          username\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getChatMembersQuery($chatId: String!) {\n    getChatMembers(chatId: $chatId) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      role\n    }\n  }\n"): (typeof documents)["\n  query getChatMembersQuery($chatId: String!) {\n    getChatMembers(chatId: $chatId) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAvailableMembersQuery($chatId: String!, $searchText: String!) {\n    getAvailableMembers(chatId: $chatId, searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query getAvailableMembersQuery($chatId: String!, $searchText: String!) {\n    getAvailableMembers(chatId: $chatId, searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUnseenChatsCountQuery {\n    getUnseenChatsCount\n  }\n"): (typeof documents)["\n  query GetUnseenChatsCountQuery {\n    getUnseenChatsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPeopleWithMessageSeen($messageId: String!) {\n    getPeopleWithMessageSeen(messageId: $messageId) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query GetPeopleWithMessageSeen($messageId: String!) {\n    getPeopleWithMessageSeen(messageId: $messageId) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUnseenNotificationsCountQuery {\n    getUnseenNotificationsCount\n  }\n"): (typeof documents)["\n  query GetUnseenNotificationsCountQuery {\n    getUnseenNotificationsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllNotificationsQuery {\n    getAllNotifications {\n      seenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          tweet {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n\n      unseenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          tweet {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllNotificationsQuery {\n    getAllNotifications {\n      seenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          tweet {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n\n      unseenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          tweet {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTweetEnagagementQuery($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTweetEnagagementQuery($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLikedByQuery($tweetId: String!) {\n    getTweetEngagement(tweetId: $tweetId) {\n      likes {\n        username\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLikedByQuery($tweetId: String!) {\n    getTweetEngagement(tweetId: $tweetId) {\n      likes {\n        username\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDetailedLikedByQuery($tweetId: String!) {\n    getTweetEngagement(tweetId: $tweetId) {\n      likes {\n        username\n        profileImageURL\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDetailedLikedByQuery($tweetId: String!) {\n    getTweetEngagement(tweetId: $tweetId) {\n      likes {\n        username\n        profileImageURL\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTweetCommentsQuery($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      tweetEngagement {\n        comments {\n          id\n          content\n          createdAt\n          updatedAt\n          likesCount\n          isCommentLikedBySessionUser\n          author {\n            firstName\n            lastName\n            username\n            profileImageURL\n          }\n\n          commentsCount\n          parentComment {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTweetCommentsQuery($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      tweetEngagement {\n        comments {\n          id\n          content\n          createdAt\n          updatedAt\n          likesCount\n          isCommentLikedBySessionUser\n          author {\n            firstName\n            lastName\n            username\n            profileImageURL\n          }\n\n          commentsCount\n          parentComment {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCommentsOfComment($commentId: String!) {\n    getCommentsOfComment(commentId: $commentId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n\n      likesCount\n      isCommentLikedBySessionUser\n\n      parentComment {\n        id\n      }\n\n      repliedTo {\n        id\n        author {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCommentsOfComment($commentId: String!) {\n    getCommentsOfComment(commentId: $commentId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n\n      likesCount\n      isCommentLikedBySessionUser\n\n      parentComment {\n        id\n      }\n\n      repliedTo {\n        id\n        author {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRepliedToComment($commentId: String!, $tweetId: String!) {\n    getComment(commentId: $commentId, tweetId: $tweetId) {\n      repliedTo {\n        content\n        createdAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRepliedToComment($commentId: String!, $tweetId: String!) {\n    getComment(commentId: $commentId, tweetId: $tweetId) {\n      repliedTo {\n        content\n        createdAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookmarksQuery {\n    getBookmarks {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookmarksQuery {\n    getBookmarks {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n"): (typeof documents)["\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTweet($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      content\n      id\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTweet($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      content\n      id\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTweetsFeed {\n    getTweetsFeed {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTweetsFeed {\n    getTweetsFeed {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      tweetEngagement {\n        likesCount\n        isTweetLikedBySessionUser\n        commentsCount\n        isTweetBookmarkedBySessionUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n"): (typeof documents)["\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserQuery($username: String) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      tweetsCount\n    }\n  }\n"): (typeof documents)["\n  query GetUserQuery($username: String) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      tweetsCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsersQuery($searchText: String!) {\n    getUsers(searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUsersQuery($searchText: String!) {\n    getUsers(searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n"): (typeof documents)["\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n"): (typeof documents)["\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollowersQuery($username: String) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollowersQuery($username: String) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollowingsQuery($username: String) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollowingsQuery($username: String) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n"): (typeof documents)["\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserTweetsQuery($username: String) {\n    getUser(username: $username) {\n      tweets {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        tweetEngagement {\n          likesCount\n          isTweetLikedBySessionUser\n          commentsCount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserTweetsQuery($username: String) {\n    getUser(username: $username) {\n      tweets {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        tweetEngagement {\n          likesCount\n          isTweetLikedBySessionUser\n          commentsCount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserLastSeen($userId: String!) {\n    getUserLastSeen(userId: $userId)\n  }\n"): (typeof documents)["\n  query getUserLastSeen($userId: String!) {\n    getUserLastSeen(userId: $userId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;