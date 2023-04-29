import { ProductVariant } from '@medusajs/medusa';
import { Separator } from '@ui/separator';
import Text from '@ui/text';

type LineItemOptionsProps = { variant: ProductVariant };

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <div className="text-small-regular flex h-4 items-center space-x-2.5 text-gray-700 ">
      {variant.options.map((option, index) => {
        // const optionName =
        //   variant.product.options.find((opt) => opt.id === option.option_id)
        //     ?.title || 'Option';
        return (
          <>
            <div>
              <Text className="" key={option.id} variant="info">
                {option.value}
              </Text>
            </div>
            {index !== variant.options.length - 1 && (
              <Separator orientation="vertical" />
            )}
          </>
        );
      })}
    </div>
  );
};

export default LineItemOptions;
