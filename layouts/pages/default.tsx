import ExploreBar from "@/components/explore-bar";
import SideBar from "@/components/side-bar";

const DefaultPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid mx-auto sm:grid-cols-9 sm:max-w-[42rem] md:grid-cols-10 md:max-w-[45rem] lg:grid-cols-14 lg:max-w-[62rem] xl:grid-cols-12 xl:min-w-[78rem]">
      <SideBar className="bg-black xs:max-sm:fixed xs:max-sm:z-50 xs:max-sm:bottom-0 xs:max-sm:w-full xs:max-sm:border-t xs:max-sm:border-t-zinc-800 sm:col-span-1 xl:col-span-3" />
      <div className="border-x border-zinc-800 sm:col-span-8 md:col-span-9 lg:ml-1 lg:mr-4 xl:col-span-6">
        {children}
      </div>
      <ExploreBar className="hidden lg:block lg:col-span-4 xl:col-span-3" />
    </div>
  );
};

export default DefaultPageLayout;
