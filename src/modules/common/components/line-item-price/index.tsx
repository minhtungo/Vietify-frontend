import cn from '@lib/util/cn';
import { getPercentageDiff } from '@lib/util/get-precentage-diff';
import { LineItem, Region } from '@medusajs/medusa';
import Text from '@modules/ui/text';
import clsx from 'clsx';
import { formatAmount } from 'medusa-react';
import { CalculatedVariant } from 'types/medusa';

type LineItemPriceProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
  style?: 'default' | 'tight';
};

const LineItemPrice = ({
  item,
  region,
  style = 'default',
}: LineItemPriceProps) => {
  const originalPrice =
    (item.variant as CalculatedVariant).original_price * item.quantity;
  const hasReducedPrice = (item.total || 0) < originalPrice;

  return (
    <div className="flex flex-col text-right text-brand-dark">
      <Text
        variant="label"
        as="span"
        className={cn('text-base-regular', hasReducedPrice && 'text-rose-600')}
      >
        {formatAmount({
          amount: item.total || 0,
          region: region,
          includeTaxes: false,
        })}
      </Text>
      {hasReducedPrice && (
        <>
          <p>
            {style === 'default' && (
              <span className="text-gray-500">Original: </span>
            )}
            <span className="line-through">
              {formatAmount({
                amount: originalPrice,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === 'default' && (
            <span className="text-rose-600">
              -{getPercentageDiff(originalPrice, item.total || 0)}%
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default LineItemPrice;
