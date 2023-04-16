import Link from '@modules/common/components/link';
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
    <div className="pb-16 lg:pb-7 content-container">
      <div className="flex flex-col pt-6 text-center border-t md:flex-row md:justify-between border-gray-400/20 lg:pt-7">
        <p className="text-brand-muted text-sm leading-7 lg:leading-[27px] lg:text-15px">
          &copy;&nbsp; Copyright {year}&nbsp;
          <Link
            className="transition-colors duration-200 ease-in-out text-brand-dark hover:text-brand"
            href="/"
          >
            Vietify
          </Link>
          &nbsp; All rights reserved
        </p>

        <ul className="flex flex-wrap justify-center items-center -mb-1.5 md:mb-0 pt-3.5 md:pt-0 gap-4 sm:gap-5 lg:gap-7">
          {payment?.map((item) => (
            <li
              className="inline-flex mb-2 md:mb-0 "
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
