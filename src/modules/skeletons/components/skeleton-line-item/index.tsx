import { Skeleton } from '@modules/ui/skeleton';

const SkeletonLineItem = () => {
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <Skeleton className="h-[143px] w-[122px] " />
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-3 w-[120px] " />
          <Skeleton className="h-3 w-[65px] " />
        </div>

        <Skeleton className="h-3 w-[65px]" />
      </div>
    </div>
  );
};

export default SkeletonLineItem;
