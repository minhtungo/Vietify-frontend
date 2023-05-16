import { FC, useState } from 'react';
import { SliderProps } from '@radix-ui/react-slider';
import { Label } from '@ui/label';
import { Slider } from '@ui/slider';

interface PriceSelectorProps {
  defaultValue: SliderProps['defaultValue'];
}

const PriceSelector: FC<PriceSelectorProps> = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="priceRange">Price Range</Label>
        <span className="rounded-md text-sm text-muted-foreground hover:border-border">
          {`$${value![0]} - $${value![1]}`}
        </span>
      </div>
      <Slider
        id="priceRange"
        max={1000}
        defaultValue={value}
        step={1}
        onValueChange={setValue}
        minStepsBetweenThumbs={1}
        className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
        aria-label="Maximum Length"
      />
    </div>
  );
};

export default PriceSelector;
