import repeat from '@lib/util/repeat';
import { Skeleton } from '@modules/ui/skeleton';

const SkeletonProductTabs = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-x-6 border-b border-gray-100 pb-2">
        {repeat(2).map((index) => (
          <Skeleton key={index} className="h-6 w-12 flex-1 basis-0 pb-2" />
        ))}
      </div>
      <div className="py-8">
        <div className="grid grid-cols-2 gap-x-8">
          {repeat(2).map((index) => (
            <div className="flex flex-col gap-y-4" key={index}>
              {repeat(3).map((index) => (
                <div className="flex flex-col gap-y-2" key={index}>
                  <Skeleton className="h-4 w-32 " />
                  <Skeleton className="h-2 w-16 " />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductTabs;
