import { Skeleton } from '@ui/skeleton';

const SkeletonProductPreview = () => {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full" />

      <div className="mt-2">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="mt-2 h-4 w-1/2 " />
        <Skeleton className="mt-2 h-3 w-2/6 " />
        <Skeleton className="mt-2 h-5 w-3/6 " />
      </div>
    </div>
  );
};

export default SkeletonProductPreview;
