import cn from '@lib/util/cn';
import { onlyUnique } from '@lib/util/only-unique';
import { ProductOption } from '@medusajs/medusa';
import Button from '@ui/button';
import clsx from 'clsx';
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
      <span className="text-base-regular">Select {title}</span>
      <div className="flex gap-2">
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption({ [option.id]: v })}
              variant="outline"
              key={v}
              className={cn(
                'text-xsmall-regular h-[35px] w-fit border !font-medium ',
                v === current && 'border-brand bg-accent text-accent-foreground'
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
