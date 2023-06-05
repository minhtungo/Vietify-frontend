import repeat from '@lib/util/repeat';
import Container from '@modules/layout/components/container';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { Skeleton } from '@modules/ui/skeleton';

const SkeletonCollectionPage = () => {
  return (
    <Container>
      <Skeleton className="mb-8 h-20 w-96" />

      <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {repeat(8).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default SkeletonCollectionPage;
