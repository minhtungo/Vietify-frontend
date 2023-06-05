import repeat from '@lib/util/repeat';
import Container from '@modules/layout/components/container';
import SkeletonButton from '@modules/skeletons/components/skeleton-button';
import SkeletonProductTabs from '@modules/skeletons/components/skeleton-product-tabs';
import { Skeleton } from '@modules/ui/skeleton';

const SkeletonProductPage = () => {
  return (
    <Container className="relative flex flex-col md:flex-row md:items-start">
      <div className="flex w-full flex-col gap-y-8">
        <div className="relative flex items-start">
          <div className="sticky top-20 hidden flex-col gap-y-4 small:flex">
            {repeat(2).map((index) => {
              return <Skeleton key={index} className="h-14 w-12" />;
            })}
          </div>
          <div className="flex flex-1 flex-col gap-y-4 small:mx-16">
            {repeat(2).map((index) => {
              return (
                <Skeleton
                  key={index}
                  className="relative aspect-[29/34] w-full"
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-12 py-8 small:sticky small:top-20 small:max-w-[344px] small:py-0 medium:max-w-[400px]">
        <div>
          <div className="mx-auto flex flex-col gap-y-12 lg:max-w-[500px]">
            <div>
              <div className="flex flex-col gap-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-52" />

                <div className="mt-4 flex flex-col gap-y-2">
                  {repeat(4).map((index) => (
                    <Skeleton key={index} className="w-62 h-4" />
                  ))}
                </div>

                <div className="my-8 flex flex-col gap-y-6">
                  <Skeleton className="h-6 w-16" />
                  <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
                    {repeat(4).map((v) => {
                      return <Skeleton key={v} className="h-[50px] w-[50px]" />;
                    })}
                  </div>
                </div>

                <Skeleton className="mb-4 h-9 w-20"></Skeleton>

                <SkeletonButton />
              </div>
            </div>
          </div>
        </div>
        <SkeletonProductTabs />
      </div>
    </Container>
  );
};

export default SkeletonProductPage;
