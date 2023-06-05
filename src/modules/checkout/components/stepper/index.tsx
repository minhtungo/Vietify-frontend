import DoubleArrow from '@modules/common/icons/double-arrow';
import Text from '@modules/ui/text';
import { FC } from 'react';

interface stepperProps {}

const Stepper: FC<stepperProps> = ({}) => {
  return (
    <ol className="mx-auto flex w-full items-center justify-center space-x-2 sm:space-x-4">
      <li className="flex items-center gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand bg-brand text-xs text-primary-foreground">
          1
        </span>
        <Text span variant="dark">
          Thông tin
        </Text>

        <DoubleArrow className="h-5 w-5 " />
      </li>
      <li className="flex items-center gap-2">
        <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand bg-brand text-xs text-primary-foreground">
          2
        </span>
        <Text span variant="dark">
          Delivery
        </Text>
        <DoubleArrow className="h-5 w-5" />
      </li>
      <li className="flex items-center gap-2">
        <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand bg-brand text-xs text-primary-foreground">
          3
        </span>
        <Text span variant="dark">
          Thanh toán
        </Text>
      </li>
    </ol>
  );
};

export default Stepper;
