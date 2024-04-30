import Skeleton from "./skeleton";

export default function TweetCardLoading() {
  return (
    <div className="flex items-start gap-3 w-full border-y border-t-0 border-zinc-800 transition-all p-3">
      <div>
        <Skeleton className="w-[40px] h-[40px] rounded-full" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-3 items-center">
          <Skeleton className="w-40 h-3" />
          <div className="flex gap-2 items-center">
            <Skeleton className="w-28 h-3" />
            <Skeleton className="w-1 h-1 rounded-full" />
            <Skeleton className="w-28 h-3" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="w-6/6 h-3" />
          <Skeleton className="w-3/6 h-3" />
        </div>
        <Skeleton className="w-full h-52 rounded-2xl" />
        <div className="flex justify-between px-10">
          <Skeleton className="w-6 h-4 rounded-full" />
          <Skeleton className="w-6 h-4 rounded-full" />
          <Skeleton className="w-6 h-4 rounded-full" />
          <Skeleton className="w-6 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
