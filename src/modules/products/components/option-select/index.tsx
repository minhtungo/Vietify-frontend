import cn from '@lib/util/cn';
import { onlyUnique } from '@lib/util/only-unique';
import { ProductOption } from '@medusajs/medusa';
import Text from '@modules/ui/text';
import Button from '@ui/button';
import React from 'react';

type OptionSelectProps = {
  option: ProductOption;
  current: string;
  updateOption: (option: Record<string, string>) => void;
  title: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique);

  return (
    <div className="flex flex-col gap-y-2">
      <Text span size="sm">
        Select {title}
      </Text>
      <div className="flex gap-2">
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption({ [option.id]: v })}
              variant="outline"
              key={v}
              className={cn(
                'h-8 w-fit border !font-medium ',
                v === current &&
                  'border-muted-foreground/30 bg-accent text-accent-foreground'
              )}
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
