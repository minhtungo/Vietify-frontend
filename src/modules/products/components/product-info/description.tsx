import useTruncatedElement from '@lib/hooks/use-truncated-element';
import cn from '@lib/util/cn';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import Button from '@ui/button';
import Text from '@ui/text';
import { useRef } from 'react';

interface DescriptionTabProps {
  product: PricedProduct;
}

const DescriptionTab = ({ product }: DescriptionTabProps) => {
  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  return (
    <>
      <Text
        ref={ref}
        className={cn('break-words', !isShowingMore && 'line-clamp-[5]')}
        variant="dark"
      >
        {product.description}
      </Text>
      {isTruncated && (
        <Button
          className="mx-auto mt-3 block"
          variant="outline"
          onClick={toggleIsShowingMore}
        >
          {isShowingMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </>
  );
};

export default DescriptionTab;
