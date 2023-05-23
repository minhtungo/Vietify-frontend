import cn from '@lib/util/cn';
import { ProductVariant } from '@medusajs/medusa';
import { Separator } from '@ui/separator';
import Text from '@ui/text';

interface LineItemOptionsProps {
  variant: ProductVariant;
  className?: string;
}

const LineItemOptions: React.FC<LineItemOptionsProps> = ({
  variant,
  className,
}) => {
  return (
    <div className={cn('flex h-4 items-center space-x-2.5', className)}>
      {variant.options.map((option, index) => {
        // const optionName =
        //   variant.product.options.find((opt) => opt.id === option.option_id)
        //     ?.title || 'Option';
        return (
          <div key={option.id}>
            <Text size="sm">{option.value}</Text>
            {index !== variant.options.length - 1 && (
              <Separator orientation="vertical" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LineItemOptions;
