import ArrowRight from '@icons/arrow-right';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

type UnderlineLinkProps = {
  href: string;
  children?: React.ReactNode;
};

const UnderlineLink = ({ href, children }: UnderlineLinkProps) => {
  return (
    <div className="flex items-start">
      <Link
        href={href}
        className="text-large-regular group flex items-center gap-x-2 border-b border-current transition-all duration-300 hover:pl-1 hover:pr-1"
      >
        <span>{children}</span>
        <IoIosArrowForward
          size={16}
          className="text-gray-600 transition-all duration-300 group-hover:ml-1"
        />
      </Link>
    </div>
  );
};

export default UnderlineLink;
