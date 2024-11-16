import { Chat, ChatMemberRole, ChatMembership } from "@/gql/graphql";
import Modal from "./ui/modal";
import {
  useAddGroupAdmin,
  useRemoveGroupAdmin,
  useRemoveMemberFromGroup,
} from "@/hooks/mutations/chat";
import mergeClasses from "@/utils/mergeClasses";

interface ChatMemberOptionsModalProps {
  onClose: () => void;
  chatMember: ChatMembership;
  chat: Chat;
}

export default function ChatMemberOptionsModal(
  props: ChatMemberOptionsModalProps
) {
  const { onClose, chatMember, chat } = props;
  const removeMemberMutation = useRemoveMemberFromGroup();
  const addAdminMutation = useAddGroupAdmin();
  const removeAdminMutation = useRemoveGroupAdmin();

  console.log("chatMember -", chatMember);

  return (
    <Modal wrapperId="chat-member-options-modal" onClose={onClose}>
      <div className="flex flex-col w-72 text-center text-sm font-semibold">
        <>
          {chatMember.role === ChatMemberRole.Member ? (
            <h2
              onClick={async () => {
                await addAdminMutation.mutateAsync({
                  chatId: chat.id!,
                  targetUserId: chatMember.user?.id!,
                });
                onClose();
              }}
              className={mergeClasses(
                "border-b border-zinc-800 px-4 py-4 transition-all cursor-pointer hover:bg-zinc-900",
                addAdminMutation.isPending && "cursor-wait hover:bg-zinc-950"
              )}
            >
              Make Admin
            </h2>
          ) : (
            <h2
              onClick={async () => {
                await removeAdminMutation.mutateAsync({
                  chatId: chat.id!,
                  targetUserId: chatMember.user?.id!,
                });
                onClose();
              }}
              className={mergeClasses(
                "border-b border-zinc-800 px-4 py-4 transition-all cursor-pointer hover:bg-zinc-900",
                removeAdminMutation.isPending && "cursor-wait hover:bg-zinc-950"
              )}
            >
              Remove as admin
            </h2>
          )}
        </>
        <h2
          onClick={async () => {
            await removeMemberMutation.mutateAsync({
              chatId: chat.id,
              targetUser: chatMember.user!,
            });
            onClose();
          }}
          className={mergeClasses(
            "text-red-500 border-b border-zinc-800 px-4 py-4 transition-all cursor-pointer hover:bg-zinc-900",
            removeMemberMutation.isPending && "cursor-wait hover:bg-zinc-950"
          )}
        >
          Remove {chatMember.user?.firstName} {chatMember.user?.lastName}
        </h2>
        <h2
          onClick={onClose}
          className="px-4 py-4 transition-all cursor-pointer hover:bg-zinc-900"
        >
          Cancel
        </h2>
      </div>
    </Modal>
  );
}
