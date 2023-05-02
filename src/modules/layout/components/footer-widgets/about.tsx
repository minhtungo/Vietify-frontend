import Link from '@common/link';
import cn from '@lib/util/cn';
import Logo from '@modules/common/components/logo';
import Image from 'next/legacy/image';

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}

const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  return (
    <div className={cn('pb-10 sm:pb-0', className)}>
      <div className="mx-auto flex max-w-[300px] flex-col pb-6 text-center sm:ml-0 sm:pb-5 sm:text-left">
        <Logo className="mx-auto mb-3 select-none sm:ml-0 lg:mb-4" />
        <p className="text-sm text-brand-muted lg:text-[15px]">
          Where the Viet never sleeps.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {social?.map((item) => (
          <li
            className="transition hover:opacity-80"
            key={`social-list--key${item.id}`}
          >
            <Link href={item.path}>
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
