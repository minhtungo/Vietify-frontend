import FastDelivery from '@modules/common/icons/fast-delivery';
import Text from '@modules/ui/text';
import { FC } from 'react';

interface IncentivesProps {}

const Incentives: FC<IncentivesProps> = ({}) => {
  return (
    <div className="content-container flex items-center justify-evenly">
      <div className="flex items-center gap-2 sm:flex-row">
        <FastDelivery className="text-brand" size={40} />
        <Text variant="label" className="text-brand">
          Free, contactless delivery
        </Text>
      </div>
      <div className="flex items-center gap-2 sm:flex-row">
        <FastDelivery className="text-brand" size={40} />
        <Text variant="label" className="text-brand">
          Free, contactless delivery
        </Text>
      </div>
      <div className="flex items-center gap-2 sm:flex-row">
        <FastDelivery className="text-brand" size={40} />
        <Text variant="label" className="text-brand">
          Free, contactless delivery
        </Text>
      </div>
    </div>
  );
};

export default Incentives;
