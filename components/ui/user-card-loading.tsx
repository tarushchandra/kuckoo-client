import mergeClasses from "@/utils/mergeClasses";
import Skeleton from "./skeleton";

//

interface UserCardLoadingProps {
  className?: string;
  nameClassName?: string;
  userNameClassName?: string;
  skeletonClassName?: string;
}

export default function UserCardLoading(props: UserCardLoadingProps) {
  const { className, nameClassName, userNameClassName, skeletonClassName } =
    props;

  return (
    <div className={mergeClasses("flex gap-2 items-center", className)}>
      <Skeleton
        className={mergeClasses(
          "w-[45px] h-[45px] rounded-full",
          skeletonClassName
        )}
      />
      <div className="flex flex-col gap-2">
        <Skeleton
          className={mergeClasses("h-3", nameClassName, skeletonClassName)}
        />
        <Skeleton
          className={mergeClasses("h-3", userNameClassName, skeletonClassName)}
        />
      </div>
    </div>
  );
}
