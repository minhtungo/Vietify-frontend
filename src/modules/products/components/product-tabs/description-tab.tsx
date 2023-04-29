import useTruncatedElement from '@lib/hooks/use-truncated-element';
import cn from '@lib/util/cn';
import { Product } from '@medusajs/medusa';
import Button from '@ui/button';
import { TabsContent } from '@ui/tabs';
import Text from '@ui/text';
import { useRef } from 'react';

interface DescriptionTabProps {
  product: Product;
}

const DescriptionTab = ({ product }: DescriptionTabProps) => {
  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  return (
    <TabsContent value="Description" className="text-medium-regular py-8">
      <div className="py-4">
        <Text
          ref={ref}
          className={cn('break-words', !isShowingMore && 'line-clamp-3')}
        >
          {product.description}
        </Text>
        {isTruncated && (
          <Button
            className="mx-auto mt-4 block"
            variant="outline"
            onClick={toggleIsShowingMore}
          >
            {isShowingMore ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>
      {product.tags.length ? (
        <div>
          <span className="font-semibold">Tags</span>
        </div>
      ) : null}
    </TabsContent>
  );
};

export default DescriptionTab;
