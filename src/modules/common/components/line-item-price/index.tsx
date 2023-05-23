import { getPercentageDiff } from '@lib/util/get-precentage-diff';
import { LineItem, Region } from '@medusajs/medusa';
import Text from '@modules/ui/text';
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
    <div className="flex flex-col text-right">
      <Text
        span
        className="!font-semibold"
        variant={hasReducedPrice ? 'brand' : 'dark'}
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
            {style === 'default' && <Text span>Original: </Text>}
            <Text span className="line-through">
              {formatAmount({
                amount: originalPrice,
                region: region,
                includeTaxes: false,
              })}
            </Text>
          </p>
          {style === 'default' && (
            <Text variant="brand" span>
              -{getPercentageDiff(originalPrice, item.total || 0)}%
            </Text>
          )}
        </>
      )}
    </div>
  );
};

export default LineItemPrice;
