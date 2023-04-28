import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Link from '@common/link';
import Text from '@ui/text';
import { IoCaretForward } from 'react-icons/io5';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  bgColor: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { icon, title, bgColor } = item;
  return (
    <div
      className={cn('group flex items-center gap-2 p-3 xl:p-4', className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-full bg-brand-light md:h-[70px] md:w-[70px] xl:h-16 xl:w-16">
        {icon}
      </div>
      <div>
        <Heading variant="titleSmall" className="-mt-0.5 mb-1.5">
          {title}
        </Heading>
        <Text variant="info" className="text-sm">
          Tell about your service.
        </Text>
      </div>
    </div>
  );
};

export default FeaturedCard;
