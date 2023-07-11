import { useCheckout } from '@lib/context/checkout-context';
import cn from '@lib/util/cn';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';

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
        state && 'pointer-events-none select-none opacity-60'
      )}
      {...props}
    >
      <CardHeader className="flex-row items-center gap-x-3 space-y-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {index}
        </div>
        <CardTitle className="md:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out">
          {state ? closedState : children}
        </div>
      </CardContent>
    </Card>
  );
};

export default StepContainer;
