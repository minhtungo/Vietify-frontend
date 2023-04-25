import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
import Link from '@modules/common/components/link';
import { IoCaretForward } from 'react-icons/io5';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  href: string;
  bgColor: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { icon, title, href, bgColor } = item;
  return (
    <Link href={href}>
      <div
        className={cn('group p-5 xl:p-6 3xl:p-7 flex items-center', className)}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex shrink-0 items-center justify-center bg-brand-light rounded-full w-[65px] md:w-[70px] xl:w-20 3xl:w-[90px] h-[65px] md:h-[70px] xl:h-20 3xl:h-[90px] shadow-featured">
          {icon}
        </div>
        <div className="pl-4 md:pl-5 lg:pl-4 3xl:pl-6">
          <Heading variant="title" className="mb-2 md:mb-3 -mt-0.5">
            {title}
          </Heading>
          <div className="uppercase text-xs xl:text-13px font-manrope font-semibold tracking-[0.6px] flex items-center text-brand-dark text-opacity-60 transition duration-200 ease-in-out group-hover:text-opacity-100">
            Learn More
            <IoCaretForward className="text-sm xl:text-base transition duration-200 ease-in-out ml-1 lg:ml-1.5  opacity-60 group-hover:ml-1.5 lg:group-hover:ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
