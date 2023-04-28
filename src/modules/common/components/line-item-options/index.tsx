import { ProductVariant } from '@medusajs/medusa';
import Text from '@ui/text';

type LineItemOptionsProps = { variant: ProductVariant };

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <div className="text-small-regular text-gray-700">
      {variant.options.map((option) => {
        // const optionName =
        //   variant.product.options.find((opt) => opt.id === option.option_id)
        //     ?.title || 'Option';
        return (
          <Text
            className="border-x px-2 first:border-none first:pl-0 first:pr-2 last:border-none"
            key={option.id}
            variant="info"
            as="span"
          >
            {option.value}
          </Text>
        );
      })}
    </div>
  );
};

export default LineItemOptions;
