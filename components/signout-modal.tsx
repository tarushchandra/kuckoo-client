"use client";
import { useAuth } from "@/hooks/auth";
import Modal from "./ui/modal";
import { selectGoogleButton } from "@/lib/redux/features/auth/authSlice";

export default function SignOutModal({ onClose }: { onClose: () => void }) {
  const { signOutAction } = useAuth(selectGoogleButton);

  return (
    <Modal wrapperId="signout-modal" onClose={onClose}>
      <div className="p-8 flex flex-col gap-4">
        <div>
          {/* <h1 className="text-2xl font-bold text-center">Sign Out?</h1> */}
          <h2 className="text-zinc-400">Do you want to sign out?</h2>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-black border border-zinc-800 font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] hover:bg-zinc-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-white text-black font-semibold px-4 py-1 rounded-full cursor-pointer transition-all hover:bg-zinc-200 active:scale-[0.95] disabled:cursor-wait"
            onClick={() => signOutAction()}
          >
            Sign out
          </button>
        </div>
      </div>
    </Modal>
  );
}
