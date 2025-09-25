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
    "\n  mutation LikePostMutation($postId: String!) {\n    likePost(postId: $postId)\n  }\n": types.LikePostMutationDocument,
    "\n  mutation DislikePostMutation($postId: String!) {\n    dislikePost(postId: $postId)\n  }\n": types.DislikePostMutationDocument,
    "\n  mutation CreateComment($postId: String!, $content: String!) {\n    createComment(postId: $postId, content: $content)\n  }\n": types.CreateCommentDocument,
    "\n  mutation EditComment($commentId: String!, $content: String!) {\n    updateComment(commentId: $commentId, content: $content)\n  }\n": types.EditCommentDocument,
    "\n  mutation DeleteComment($postId: String!, $commentId: String!) {\n    deleteComment(postId: $postId, commentId: $commentId)\n  }\n": types.DeleteCommentDocument,
    "\n  mutation LikeComment($commentId: String!) {\n    likeComment(commentId: $commentId)\n  }\n": types.LikeCommentDocument,
    "\n  mutation DislikeComment($commentId: String!) {\n    dislikeComment(commentId: $commentId)\n  }\n": types.DislikeCommentDocument,
    "\n  mutation CreateReply(\n    $postId: String!\n    $commentId: String!\n    $content: String!\n  ) {\n    createReply(postId: $postId, commentId: $commentId, content: $content)\n  }\n": types.CreateReplyDocument,
    "\n  mutation CreateBookmark($postId: String!) {\n    createBookmark(postId: $postId)\n  }\n": types.CreateBookmarkDocument,
    "\n  mutation RemoveBookmark($postId: String!) {\n    removeBookmark(postId: $postId)\n  }\n": types.RemoveBookmarkDocument,
    "\n  mutation CreatePost($payload: PostInput!) {\n    createPost(payload: $payload)\n  }\n": types.CreatePostDocument,
    "\n  mutation DeletePost($postId: ID!) {\n    deletePost(postId: $postId)\n  }\n": types.DeletePostDocument,
    "\n  mutation UpdatePost($postId: ID!, $payload: PostInput!) {\n    updatePost(postId: $postId, payload: $payload)\n  }\n": types.UpdatePostDocument,
    "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n": types.CreateUserWithEmailAndPasswordMutationDocument,
    "\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserMutationDocument,
    "\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserMutationDocument,
    "\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n": types.RemoveFollowerDocument,
    "\n  query GetTokensQuery($googleToken: String, $user: SignInFormInput) {\n    getTokens(googleToken: $googleToken, user: $user)\n  }\n": types.GetTokensQueryDocument,
    "\n  query VerifyRefreshTokenQuery {\n    verifyRefreshToken\n  }\n": types.VerifyRefreshTokenQueryDocument,
    "\n  query DeleteTokensQuery {\n    deleteTokens\n  }\n": types.DeleteTokensQueryDocument,
    "\n  query GetChatsQuery {\n    getChats {\n      id\n      name\n      isGroupChat\n      totalMembersCount\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      members {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n        lastSeenAt\n      }\n      latestMessage {\n        content\n        sender {\n          firstName\n          username\n          profileImageURL\n        }\n        createdAt\n      }\n      unseenMessagesCount\n    }\n  }\n": types.GetChatsQueryDocument,
    "\n  query GetChatQuery($targetUserId: String!) {\n    getChat(targetUserId: $targetUserId) {\n      id\n      createdAt\n      creator {\n        firstName\n        lastName\n        username\n      }\n      unseenMessagesCount\n    }\n  }\n": types.GetChatQueryDocument,
    "\n  query getChatHistoryQuery($chatId: String!) {\n    getChatHistory(chatId: $chatId) {\n      date\n      messages {\n        unseenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        seenMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n        }\n        sessionUserMessages {\n          id\n          content\n          sender {\n            id\n            username\n            profileImageURL\n          }\n          createdAt\n          seenBy {\n            id\n          }\n        }\n      }\n      activities {\n        id\n        type\n        metaData {\n          chatName\n        }\n        user {\n          firstName\n          lastName\n          username\n        }\n        targetUser {\n          firstName\n          lastName\n          username\n        }\n        createdAt\n      }\n    }\n  }\n": types.GetChatHistoryQueryDocument,
    "\n  query getChatMembersQuery($chatId: String!) {\n    getChatMembers(chatId: $chatId) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      role\n    }\n  }\n": types.GetChatMembersQueryDocument,
    "\n  query getAvailableMembersQuery($chatId: String!, $searchText: String!) {\n    getAvailableMembers(chatId: $chatId, searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n": types.GetAvailableMembersQueryDocument,
    "\n  query GetUnseenChatsCountQuery {\n    getUnseenChatsCount\n  }\n": types.GetUnseenChatsCountQueryDocument,
    "\n  query GetPeopleWithMessageSeen($messageId: String!) {\n    getPeopleWithMessageSeen(messageId: $messageId) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n    }\n  }\n": types.GetPeopleWithMessageSeenDocument,
    "\n  query GetUnseenNotificationsCountQuery {\n    getUnseenNotificationsCount\n  }\n": types.GetUnseenNotificationsCountQueryDocument,
    "\n  query GetAllNotificationsQuery {\n    getAllNotifications {\n      seenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          post {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n\n      unseenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          post {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n    }\n  }\n": types.GetAllNotificationsQueryDocument,
    "\n  query GetPostEnagagementQuery($postId: String!) {\n    getPost(postId: $postId) {\n      postEngagement {\n        likesCount\n        isPostLikedBySessionUser\n        commentsCount\n        isPostBookmarkedBySessionUser\n      }\n    }\n  }\n": types.GetPostEnagagementQueryDocument,
    "\n  query GetLikedByQuery($postId: String!) {\n    getPostEngagement(postId: $postId) {\n      likes {\n        username\n        profileImageURL\n      }\n    }\n  }\n": types.GetLikedByQueryDocument,
    "\n  query GetDetailedLikedByQuery($postId: String!) {\n    getPostEngagement(postId: $postId) {\n      likes {\n        username\n        profileImageURL\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n": types.GetDetailedLikedByQueryDocument,
    "\n  query GetPostCommentsQuery($postId: String!) {\n    getPost(postId: $postId) {\n      postEngagement {\n        comments {\n          id\n          content\n          createdAt\n          updatedAt\n          likesCount\n          isCommentLikedBySessionUser\n          author {\n            firstName\n            lastName\n            username\n            profileImageURL\n          }\n\n          commentsCount\n          parentComment {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.GetPostCommentsQueryDocument,
    "\n  query GetCommentsOfComment($commentId: String!) {\n    getCommentsOfComment(commentId: $commentId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n\n      likesCount\n      isCommentLikedBySessionUser\n\n      parentComment {\n        id\n      }\n\n      repliedTo {\n        id\n        author {\n          username\n        }\n      }\n    }\n  }\n": types.GetCommentsOfCommentDocument,
    "\n  query getRepliedToComment($commentId: String!, $postId: String!) {\n    getComment(commentId: $commentId, postId: $postId) {\n      repliedTo {\n        content\n        createdAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetRepliedToCommentDocument,
    "\n  query GetBookmarksQuery {\n    getBookmarks {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      postEngagement {\n        likesCount\n        isPostLikedBySessionUser\n        commentsCount\n        isPostBookmarkedBySessionUser\n      }\n    }\n  }\n": types.GetBookmarksQueryDocument,
    "\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n": types.GetSignedUrlForUploadingImageQueryDocument,
    "\n  query GetPost($postId: String!) {\n    getPost(postId: $postId) {\n      content\n      id\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n": types.GetPostDocument,
    "\n  query GetPaginatedPostsFeed($limit: Int!, $cursor: String) {\n    getPaginatedPostsFeed(limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n        postEngagement {\n          likesCount\n          isPostLikedBySessionUser\n          commentsCount\n          isPostBookmarkedBySessionUser\n        }\n      }\n      nextCursor\n    }\n  }\n": types.GetPaginatedPostsFeedDocument,
    "\n  query GetPaginatedUserPostsQuery(\n    $userId: String!\n    $limit: Int!\n    $cursor: String\n  ) {\n    getPaginatedPosts(userId: $userId, limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        postEngagement {\n          likesCount\n          isPostLikedBySessionUser\n          commentsCount\n        }\n      }\n      nextCursor\n    }\n  }\n": types.GetPaginatedUserPostsQueryDocument,
    "\n  query GetUserQuery($username: String!) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      postsCount\n    }\n  }\n": types.GetUserQueryDocument,
    "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetSessionUserQueryDocument,
    "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n": types.GetAllUsersQueryDocument,
    "\n  query GetUsersQuery($searchText: String!) {\n    getUsers(searchText: $searchText) {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetUsersQueryDocument,
    "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n": types.IsUsernameExistQueryDocument,
    "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n": types.IsEmailExistQueryDocument,
    "\n  query GetFollowersQuery($username: String!) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n": types.GetFollowersQueryDocument,
    "\n  query GetFollowingsQuery($username: String!) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n": types.GetFollowingsQueryDocument,
    "\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n": types.GetMutualUsersDocument,
    "\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n": types.GetIsFollowingQueryDocument,
    "\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n": types.GetRecommendedUsersQueryDocument,
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
export function graphql(source: "\n  mutation LikePostMutation($postId: String!) {\n    likePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation LikePostMutation($postId: String!) {\n    likePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DislikePostMutation($postId: String!) {\n    dislikePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation DislikePostMutation($postId: String!) {\n    dislikePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($postId: String!, $content: String!) {\n    createComment(postId: $postId, content: $content)\n  }\n"): (typeof documents)["\n  mutation CreateComment($postId: String!, $content: String!) {\n    createComment(postId: $postId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditComment($commentId: String!, $content: String!) {\n    updateComment(commentId: $commentId, content: $content)\n  }\n"): (typeof documents)["\n  mutation EditComment($commentId: String!, $content: String!) {\n    updateComment(commentId: $commentId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComment($postId: String!, $commentId: String!) {\n    deleteComment(postId: $postId, commentId: $commentId)\n  }\n"): (typeof documents)["\n  mutation DeleteComment($postId: String!, $commentId: String!) {\n    deleteComment(postId: $postId, commentId: $commentId)\n  }\n"];
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
export function graphql(source: "\n  mutation CreateReply(\n    $postId: String!\n    $commentId: String!\n    $content: String!\n  ) {\n    createReply(postId: $postId, commentId: $commentId, content: $content)\n  }\n"): (typeof documents)["\n  mutation CreateReply(\n    $postId: String!\n    $commentId: String!\n    $content: String!\n  ) {\n    createReply(postId: $postId, commentId: $commentId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBookmark($postId: String!) {\n    createBookmark(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation CreateBookmark($postId: String!) {\n    createBookmark(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveBookmark($postId: String!) {\n    removeBookmark(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation RemoveBookmark($postId: String!) {\n    removeBookmark(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($payload: PostInput!) {\n    createPost(payload: $payload)\n  }\n"): (typeof documents)["\n  mutation CreatePost($payload: PostInput!) {\n    createPost(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($postId: ID!) {\n    deletePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation DeletePost($postId: ID!) {\n    deletePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePost($postId: ID!, $payload: PostInput!) {\n    updatePost(postId: $postId, payload: $payload)\n  }\n"): (typeof documents)["\n  mutation UpdatePost($postId: ID!, $payload: PostInput!) {\n    updatePost(postId: $postId, payload: $payload)\n  }\n"];
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
export function graphql(source: "\n  query GetTokensQuery($googleToken: String, $user: SignInFormInput) {\n    getTokens(googleToken: $googleToken, user: $user)\n  }\n"): (typeof documents)["\n  query GetTokensQuery($googleToken: String, $user: SignInFormInput) {\n    getTokens(googleToken: $googleToken, user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VerifyRefreshTokenQuery {\n    verifyRefreshToken\n  }\n"): (typeof documents)["\n  query VerifyRefreshTokenQuery {\n    verifyRefreshToken\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DeleteTokensQuery {\n    deleteTokens\n  }\n"): (typeof documents)["\n  query DeleteTokensQuery {\n    deleteTokens\n  }\n"];
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
export function graphql(source: "\n  query GetAllNotificationsQuery {\n    getAllNotifications {\n      seenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          post {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n\n      unseenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          post {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllNotificationsQuery {\n    getAllNotifications {\n      seenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          post {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n\n      unseenNotifications {\n        id\n        type\n        sender {\n          id\n          firstName\n          lastName\n          profileImageURL\n          username\n        }\n        createdAt\n        metaData {\n          post {\n            id\n            imageURL\n          }\n          comment {\n            content\n          }\n          repliedComment {\n            content\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPostEnagagementQuery($postId: String!) {\n    getPost(postId: $postId) {\n      postEngagement {\n        likesCount\n        isPostLikedBySessionUser\n        commentsCount\n        isPostBookmarkedBySessionUser\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostEnagagementQuery($postId: String!) {\n    getPost(postId: $postId) {\n      postEngagement {\n        likesCount\n        isPostLikedBySessionUser\n        commentsCount\n        isPostBookmarkedBySessionUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLikedByQuery($postId: String!) {\n    getPostEngagement(postId: $postId) {\n      likes {\n        username\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLikedByQuery($postId: String!) {\n    getPostEngagement(postId: $postId) {\n      likes {\n        username\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDetailedLikedByQuery($postId: String!) {\n    getPostEngagement(postId: $postId) {\n      likes {\n        username\n        profileImageURL\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDetailedLikedByQuery($postId: String!) {\n    getPostEngagement(postId: $postId) {\n      likes {\n        username\n        profileImageURL\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPostCommentsQuery($postId: String!) {\n    getPost(postId: $postId) {\n      postEngagement {\n        comments {\n          id\n          content\n          createdAt\n          updatedAt\n          likesCount\n          isCommentLikedBySessionUser\n          author {\n            firstName\n            lastName\n            username\n            profileImageURL\n          }\n\n          commentsCount\n          parentComment {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostCommentsQuery($postId: String!) {\n    getPost(postId: $postId) {\n      postEngagement {\n        comments {\n          id\n          content\n          createdAt\n          updatedAt\n          likesCount\n          isCommentLikedBySessionUser\n          author {\n            firstName\n            lastName\n            username\n            profileImageURL\n          }\n\n          commentsCount\n          parentComment {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCommentsOfComment($commentId: String!) {\n    getCommentsOfComment(commentId: $commentId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n\n      likesCount\n      isCommentLikedBySessionUser\n\n      parentComment {\n        id\n      }\n\n      repliedTo {\n        id\n        author {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCommentsOfComment($commentId: String!) {\n    getCommentsOfComment(commentId: $commentId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n\n      likesCount\n      isCommentLikedBySessionUser\n\n      parentComment {\n        id\n      }\n\n      repliedTo {\n        id\n        author {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRepliedToComment($commentId: String!, $postId: String!) {\n    getComment(commentId: $commentId, postId: $postId) {\n      repliedTo {\n        content\n        createdAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRepliedToComment($commentId: String!, $postId: String!) {\n    getComment(commentId: $commentId, postId: $postId) {\n      repliedTo {\n        content\n        createdAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookmarksQuery {\n    getBookmarks {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      postEngagement {\n        likesCount\n        isPostLikedBySessionUser\n        commentsCount\n        isPostBookmarkedBySessionUser\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookmarksQuery {\n    getBookmarks {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n      postEngagement {\n        likesCount\n        isPostLikedBySessionUser\n        commentsCount\n        isPostBookmarkedBySessionUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n"): (typeof documents)["\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPost($postId: String!) {\n    getPost(postId: $postId) {\n      content\n      id\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPost($postId: String!) {\n    getPost(postId: $postId) {\n      content\n      id\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPaginatedPostsFeed($limit: Int!, $cursor: String) {\n    getPaginatedPostsFeed(limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n        postEngagement {\n          likesCount\n          isPostLikedBySessionUser\n          commentsCount\n          isPostBookmarkedBySessionUser\n        }\n      }\n      nextCursor\n    }\n  }\n"): (typeof documents)["\n  query GetPaginatedPostsFeed($limit: Int!, $cursor: String) {\n    getPaginatedPostsFeed(limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        author {\n          firstName\n          lastName\n          username\n          profileImageURL\n        }\n        postEngagement {\n          likesCount\n          isPostLikedBySessionUser\n          commentsCount\n          isPostBookmarkedBySessionUser\n        }\n      }\n      nextCursor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPaginatedUserPostsQuery(\n    $userId: String!\n    $limit: Int!\n    $cursor: String\n  ) {\n    getPaginatedPosts(userId: $userId, limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        postEngagement {\n          likesCount\n          isPostLikedBySessionUser\n          commentsCount\n        }\n      }\n      nextCursor\n    }\n  }\n"): (typeof documents)["\n  query GetPaginatedUserPostsQuery(\n    $userId: String!\n    $limit: Int!\n    $cursor: String\n  ) {\n    getPaginatedPosts(userId: $userId, limit: $limit, cursor: $cursor) {\n      posts {\n        id\n        content\n        imageURL\n        createdAt\n        updatedAt\n        postEngagement {\n          likesCount\n          isPostLikedBySessionUser\n          commentsCount\n        }\n      }\n      nextCursor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserQuery($username: String!) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      postsCount\n    }\n  }\n"): (typeof documents)["\n  query GetUserQuery($username: String!) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      postsCount\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetFollowersQuery($username: String!) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollowersQuery($username: String!) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollowingsQuery($username: String!) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollowingsQuery($username: String!) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query getUserLastSeen($userId: String!) {\n    getUserLastSeen(userId: $userId)\n  }\n"): (typeof documents)["\n  query getUserLastSeen($userId: String!) {\n    getUserLastSeen(userId: $userId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;