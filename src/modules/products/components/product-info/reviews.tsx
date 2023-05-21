import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import ReviewCard from '@modules/review/templates/review-card';
import { Separator } from '@ui/separator';

import { book } from '@static/book';
import { TabsContent } from '@ui/tabs';

interface ReviewsTabProps {
  product: PricedProduct;
}

const ReviewsTab = ({ product }: ReviewsTabProps) => {
  return (
    <>
      <ReviewCard />
      <Separator className="my-4" />
      <ReviewCard />
      <Separator className="my-4" />
      <ReviewCard />
    </>
  );
};

export default ReviewsTab;
