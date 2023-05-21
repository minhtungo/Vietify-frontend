import Link from '@common/link';
import Image from 'next/image';

interface CopyrightProps {
  variant?: 'default' | 'medium';
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}

const year = new Date().getFullYear();

const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  return (
    <div className="pb-16 lg:py-7">
      <div className="flex flex-col text-center md:flex-row md:justify-between">
        <p className="lg:text-15px text-primary-muted text-sm leading-7 lg:leading-[27px]">
          &copy;&nbsp; Copyright {year}&nbsp;
          <Link
            className="text-primary transition-colors duration-200 ease-in-out hover:text-primary"
            href="/"
          >
            Vietify
          </Link>
          &nbsp; All rights reserved
        </p>

        <ul className="-mb-1.5 flex flex-wrap items-center justify-center gap-4 pt-3.5 sm:gap-5 md:mb-0 md:pt-0 lg:gap-7">
          {payment?.map((item) => (
            <li
              className="mb-2 inline-flex md:mb-0 "
              key={`payment-list--key${item.id}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                height={item.height}
                width={item.width}
                className="w-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Copyright;
