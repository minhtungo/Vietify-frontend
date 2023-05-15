import { Disclosure } from '@headlessui/react';
import { useCheckout } from '@lib/context/checkout-context';
import cn from '@lib/util/cn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';

type StepContainerProps = {
  index: number;
  title: string;
  closedState?: React.ReactNode;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const StepContainer = ({
  index,
  title,
  className,
  closedState,
  children,
  ...props
}: StepContainerProps) => {
  const {
    editAddresses: { state },
  } = useCheckout();
  return (
    <Card
      className={cn(
        className,
        state && 'pointer-events-none select-none opacity-50'
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
            {index}
          </div> */}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
          <AccordionItem value="item-1" className="border-none">
            <AccordionContent
              className={cn(
                'overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out',
                {
                  'max-h-[9999px] opacity-100': !state,
                  'max-h-0 opacity-0': state,
                }
              )}
            >
              {children}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionContent
              className={cn(
                'overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out',
                {
                  'max-h-[9999px] opacity-100': state,
                  'max-h-0 opacity-0': !state,
                }
              )}
            >
              {closedState}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default StepContainer;
