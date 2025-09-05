import SideBar from "@/components/side-bar";
import { useAppSelector } from "@/hooks/redux";
import mergeClasses from "@/utils/mergeClasses";

const MessagesPagesLayout = ({ children }: { children: React.ReactNode }) => {
  const selectedChat = useAppSelector((store) => store.chat.selectedChat);

  return (
    <div className="h-screen grid mx-auto sm:grid-cols-9 sm:max-w-[42rem] md:grid-cols-10 md:max-w-[45rem] lg:grid-cols-14 lg:max-w-[62rem] xl:grid-cols-19 xl:min-w-[78rem]">
      <SideBar
        className={mergeClasses(
          "bg-black xs:max-sm:fixed xs:max-sm:z-50 xs:max-sm:bottom-0 xs:max-sm:w-full xs:max-sm:border-t xs:max-sm:border-t-zinc-800 sm:col-span-1",
          selectedChat && "xs:max-sm:hidden"
        )}
      />
      {children}
    </div>
  );
};

export default MessagesPagesLayout;
