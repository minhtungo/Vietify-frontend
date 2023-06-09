import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/accordion';
import Text from '@modules/ui/text';
import { SliderProps } from '@radix-ui/react-slider';
import { Slider } from '@ui/slider';
import { FC, useState } from 'react';

interface PriceSelectorProps {
  defaultValue: SliderProps['defaultValue'];
}

const PriceFilter: FC<PriceSelectorProps> = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <AccordionItem value="price">
      <AccordionTrigger>
        <Text span variant="dark" size="md">
          Giá
        </Text>
      </AccordionTrigger>
      <AccordionContent asChild className="grid gap-3">
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
        <Text span className="ml-auto">{`$${value![0]} - $${value![1]}`}</Text>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
