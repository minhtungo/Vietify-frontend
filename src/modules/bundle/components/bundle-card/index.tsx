import cn from '@lib/util/cn';
import Heading from '@modules/ui/heading';
import Link from '@modules/common/components/link';
import Image from 'next/image';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  className?: string;
  thumbnailClassName?: string;
  href: string;
  bundle: {
    image: string;
    title: string;
    description?: string;
    bgColor?: string;
  };
}

const BundleCard: React.FC<Props> = ({
  bundle,
  imgWidth = 180,
  imgHeight = 150,
  className = '',
  thumbnailClassName = 'w-36 lg:w-32 xl:w-40 2xl:w-36 3xl:w-[180px] ltr:pr-1.5 rtl:pl-1.5 2xl:ltr:pr-2.5 2xl:rtl:pl-2.5',
  href,
}) => {
  const { image, title, description, bgColor } = bundle;
  return (
    <Link href={href} className={cn('group flex', className)}>
      <div
        className="relative flex w-full items-center overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className={cn('flex shrink-0', thumbnailClassName)}>
          <Image
            src={image ?? '/assets/placeholder/collection.svg'}
            alt={title}
            width={imgWidth as number}
            height={imgHeight as number}
            style={{ width: 'auto' }}
            className="bg-sink-thumbnail transform object-cover transition duration-200 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="py-3 ltr:pr-4 rtl:pl-4 lg:py-5 lg:ltr:pr-3 lg:rtl:pl-3 xl:ltr:pr-4 xl:rtl:pl-4">
          <Heading variant="default" className="mb-[5px]">
            {title}
          </Heading>
          <p className="lg:text-13px text-sm leading-6 xl:text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
