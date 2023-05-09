import { Skeleton } from '@modules/ui/skeleton';

const SkeletonOrderConfirmedHeader = () => {
  return (
    <div className="flex flex-col gap-y-2 pb-10">
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-6 w-3/6" />
      <div className="flex gap-x-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
};

export default SkeletonOrderConfirmedHeader;
