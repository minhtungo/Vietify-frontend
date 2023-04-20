import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
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
        className="relative flex items-center w-full overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className={cn('flex shrink-0', thumbnailClassName)}>
          <Image
            src={image ?? '/assets/placeholder/collection.svg'}
            alt={title}
            width={imgWidth as number}
            height={imgHeight as number}
            style={{ width: 'auto' }}
            className="object-cover transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
          />
        </div>
        <div className="py-3 lg:py-5 ltr:pr-4 rtl:pl-4 lg:ltr:pr-3 lg:rtl:pl-3 xl:ltr:pr-4 xl:rtl:pl-4">
          <Heading variant="default" className="mb-[5px]">
            {title}
          </Heading>
          <p className="text-sm leading-6 lg:text-13px xl:text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
