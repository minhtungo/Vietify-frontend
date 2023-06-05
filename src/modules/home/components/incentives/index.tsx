import FastDelivery from '@modules/common/icons/fast-delivery';
import Container from '@modules/layout/components/container';
import Text from '@modules/ui/text';
import { FC } from 'react';

interface IncentivesProps {}

const Incentives: FC<IncentivesProps> = ({}) => {
  return (
    <Container className="flex flex-col items-center justify-evenly gap-y-4 md:flex-row">
      <div className="flex items-center gap-2 md:flex-row">
        <FastDelivery className="text-primary" size={40} />
        <Text variant="dark" className="font-semibold">
          Free, contactless delivery
        </Text>
      </div>
      <div className="flex items-center gap-2 md:flex-row">
        <FastDelivery className="text-primary" size={40} />
        <Text variant="dark" className="font-semibold">
          Free, contactless delivery
        </Text>
      </div>
      <div className="flex items-center gap-2 md:flex-row">
        <FastDelivery className="text-primary" size={40} />
        <Text variant="dark" className="font-semibold">
          Free, contactless delivery
        </Text>
      </div>
    </Container>
  );
};

export default Incentives;
