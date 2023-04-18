import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
import Link from '@modules/common/components/link';
import Image from 'next/legacy/image';

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}

const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  return (
    <div className={cn('pb-10 sm:pb-0', className)}>
      <div className="flex flex-col text-center sm:text-left max-w-[300px] mx-auto sm:ml-0 pb-6 sm:pb-5">
        {/* <Logo
          href={'/'}
          className="mx-auto mb-3 lg:mb-5 sm:ltr:ml-0 sm:rtl:mr-0"
        /> */}
        <Heading size="md" className="mb-3 lg:mb-5">
          Vietify
        </Heading>
        <p className="text-brand-muted text-sm lg:text-[15px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          voluptates exercitationem non ducimus.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center sm:justify-start gap-2">
        {social?.map((item) => (
          <li
            className="transition hover:opacity-80"
            key={`social-list--key${item.id}`}
          >
            <Link href={item.path ? item.path : '/#'}>
              <Image
                src={item.image}
                alt={item.name}
                height={20}
                width={20}
                className="w-auto"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetAbout;
