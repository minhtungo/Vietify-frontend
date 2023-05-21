import FastDelivery from '@modules/common/icons/fast-delivery';
import Text from '@modules/ui/text';
import { FC } from 'react';

interface IncentivesProps {}

const Incentives: FC<IncentivesProps> = ({}) => {
  return (
    <div className="content-container flex flex-col items-center justify-evenly gap-y-6 py-6 md:flex-row md:py-8">
      <div className="flex items-center gap-2 md:flex-row">
        <FastDelivery className="text-brand" size={40} />
        <Text variant="brand" className="font-semibold">
          Free, contactless delivery
        </Text>
      </div>
      <div className="flex items-center gap-2 md:flex-row">
        <FastDelivery className="text-brand" size={40} />
        <Text variant="brand" className="font-semibold">
          Free, contactless delivery
        </Text>
      </div>
      <div className="flex items-center gap-2 md:flex-row">
        <FastDelivery className="text-brand" size={40} />
        <Text variant="brand" className="font-semibold">
          Free, contactless delivery
        </Text>
      </div>
    </div>
  );
};

export default Incentives;
