import { Product } from '@medusajs/medusa';
import ReviewCard from '@modules/review/templates/review-card';

import { TabsContent } from '@ui/tabs';

import { useRef } from 'react';

interface ReviewsTabProps {
  product: Product;
}

const ReviewsTab = ({ product }: ReviewsTabProps) => {
  return (
    <TabsContent value="Reviews" className="text-medium-regular py-16">
      <ReviewCard />
    </TabsContent>
  );
};

export default ReviewsTab;
